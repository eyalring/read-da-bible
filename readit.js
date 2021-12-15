const readable = require('stream').Readable;

const text = "heeelllo i added you a name , i didnt mean to let you down 3 5 , i really feel this is a miss"


const myReadable = readable();


myReadable.push(text);

