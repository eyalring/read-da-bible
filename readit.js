const readable = require('stream').Readable;
const internetWordsCounter = require('./internetreader');

const myInternetWordsCounter = new internetWordsCounter.InternetWordsCounter({source : 'http://www.gutenberg.org/cache/epub/10/pg10.txt'});
const result = readWrapper('to');

async function readWrapper(word){
    const result = await myInternetWordsCounter.readIt(word);
    console.log('the result is : ',result);
}


