const { pipeline, Transform } = require("stream");
const fs = require("fs");
const charPicker = require("./characterSetPicker");
const { stdout } = require("process");
const axios = require("axios");
const writable = require("stream").Writable;

class InternetWordsCounter {
  constructor({ source }) {
    this.source = source;
    this.wordNumberOfOcurrences = 0;
    
    this.aggregator = writable();
    this.aggregator.write = (chunk) => {
      this.wordNumberOfOcurrences += parseInt(chunk.toString());
    };

    this.wordCounter = new Transform({
      transform: function (chunk, encoding, callback) {
        const arrayOfWords = chunk.toString().split(" ");
        const result = arrayOfWords
          .map((word) => {
            return word
              .split("")
              .filter((char) => charPicker(char))
              .join("");
          })
          .reduce((map, word) => {
            if (map.get(word)) {
              map.set(word, map.get(word) + 1);
            } else {
              map.set(word, 1);
            }
            return map;
          }, new Map());
        callback(null, (result.get(this.word) || 0).toString());
      },
    });
  }
  async callPipeline(input, transformer, output) {
    return new Promise((resolve, reject) => {
      pipeline(input, transformer, output, (err) => {
        if (err) {
          console.log("Pipeline failed with an error:", err);
          reject(`Pipeline failed with an error: ${err}`);
        } else {
          resolve(this.wordNumberOfOcurrences);
        }
      });
    });
  }
  async readIt(wordToCountOcurrences) {
    this.wordCounter["word"] = wordToCountOcurrences;
    try {
      const streamToText = await axios.get(this.source, {
        responseType: "stream",
      });

      const count = await this.callPipeline(
        streamToText.data,
        this.wordCounter,
        this.aggregator
      );
      return {
        word: wordToCountOcurrences,
        repetitions: count,
      };
    } catch (error) {
      console.log("the error caught is ", error);
    }
  }
}

module.exports.InternetWordsCounter = InternetWordsCounter;
