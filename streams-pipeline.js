const {pipeline , Transform } = require('stream');
const fs = require('fs');


const response = await fetch("http://www.gutenberg.org/cache/epub/10/pg10.txt");
const streamReader = response.body.getReader();
let wordsMap = new Map();

const upperCaseTransform = new Transform({
    transform: function(chunk, encoding, callback) {
        
      const arrayOfWords = chunk.toString().split(' ');
   
   const result =    arrayOfWords
      .map((word)=>{
        return word.split('').filter((char)=>isAlphaBeticOrHyphen()).join('');
      })
      .reduce((map,word)=>{
          if(map.get(word)){
              map.set(word,map.get(word)+1);
          }else{
              map.set(word,1);
          }
          return map;
      },wordsMap)
      console.log(result);
      callback(null,null)
    },
  });

function isAlphaBeticOrHyphen(charachter){
    return true;
}

console.log('Starting pipeline...');
pipeline(streamReader, upperCaseTransform, process.stdout, err => {
  if (err) {
    console.log('Pipeline failed with an error:', err);
  } else {
    console.log('Pipeline ended successfully');
  }
});