const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');


describe('jokes endpoint', () => {
    it('should succeed in showing jokes', async () => {
        const data = {username: 'Bob', password: 'thebuilder'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        var token;
        const login = await request(server).post('/api/auth/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        token = token + "not"
        //properly loggin in
        const jokes = await request(server).get('/api/jokes').set("Authorization", token)
        expect(jokes.status).toBe(401);
    })
    it('should succeed in showing jokes', async () => {
        const data = {username: 'Bob', password: 'thebuilder'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        var token;
        const login = await request(server).post('/api/auth/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const jokes = await request(server).get('/api/jokes').set("Authorization", token)
        expect(jokes.status).toBe(200);
    })
})

beforeEach(async () => {
    await db('users').truncate();
})