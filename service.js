const express = require("express");
const app = express();
const internetWordsCounter = require("./internetreader");
const url = require("url");

app.get("/", (req, res) => {
  res.json({ eyal: "is my name", hooby: "chopping woods" });
});

app.get("/wordscount", (req, res) => {
  try {
    const myresult = countTheWords(req.url).then((result) => {
      res.json(result);
      res.end();
    }).catch((error)=>{
        res.sendStatus(400)
        res.end()
    })
  } catch (error) {
    res.sendStatus(400).end("the error is " + error.message);
  }
});

async function countTheWords(myUrl) {
  const word = url.parse(myUrl, true).query.word;
  const urlToWorkWith = url.parse(myUrl, true).query.url;
  if (word && urlToWorkWith) {
    const result = await readWrapper(word, urlToWorkWith);
    console.log("the result in count the words is : ", result);
    return result;
  } else {
    throw new Error("could not get the required path or word to count");
  }
}

async function readWrapper(word, sourceurl) {
  const myInternetWordsCounter = new internetWordsCounter.InternetWordsCounter({
    source: sourceurl,
  });
  const result = await myInternetWordsCounter.readIt(word);
  console.log("the final result is : ", result);
  return result;
}

const server = app.listen("3000");
module.exports = { app, server };
