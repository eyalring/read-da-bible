const axios = require('axios');
const { pipeline } = require("stream");


readfile();

async function readfile(){
    const res = await axios.get(
        'http://www.gutenberg.org/cache/epub/10/pg10.txt',
        {responseType: 'stream',}
        )
    res.data.pipe(process.stdout);

    //console.log(res);
}
