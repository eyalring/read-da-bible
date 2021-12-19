const app = require('../service');
const request = require('supertest');

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})
afterEach(() =>{
    app.server.close();
})
describe('Testing the get methods',()=>{
test('valid input  - returns result ', async () => {
        const wordToLookFor = 'to';
        const urlToUse = `/wordscount?word=${wordToLookFor}&url=http://www.gutenberg.org/cache/epub/10/pg10.txt`
        const res = await request(app.app).get(urlToUse);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('word',wordToLookFor);
        expect(res.body).toHaveProperty('repetitions');
    })
});




describe('Testing the get methods negative 1',()=>{
    test('invalid input , word does not exist - returns result ', async () => {
        const wordToLookFor = 'to';
        const urlToUse = `/wordscount?url=http://www.gutenberg.org/cache/epub/10/pg10.txt`
        const res = await request(app.app).get(urlToUse);
        expect(res.status).toBe(400);
        console.log(res.body);
    })
});


describe('Testing the get methods negative 2',()=>{
    test('invalid input url is missing  - returns 400 ', async () => {
        const wordToLookFor = 'to';
        const urlToUse = `/wordscount?word=${wordToLookFor}`
        const res = await request(app.app).get(urlToUse);
        expect(res.status).toBe(400);
    })
});
