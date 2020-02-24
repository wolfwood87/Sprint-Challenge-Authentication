const request = require('supertest');
const router = require('../auth/auth-router');
const db = require('../database/dbConfig.js');
const Users = require('../users/user-model.js');
const server = require('../api/server.js');

//register
describe('register endpoint', () => {
    it('should fail to create new User', async () => {
        const res = await request(server).post('/api/auth/register')

        expect(res.status).toBe(500);
    })
    it('should create new User', async () => {
        const data = {username: 'Bob', password: 'thebuilder'}
        const res = await request(server).post('/api/auth/register').send(data)

        expect(res.status).toBe(201);
    })
})
//login

describe('login endpoint', () => {
    it('should fail to login new User', async () => {
        const data = {username: 'Bob', password: 'thebuilder'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        const wrongData = {username: 'SomebodyElse', password: 'wrong'}
        const res = await request(server).post('/api/auth/login').send(wrongData)
        expect(res.status).toBe(500);
    })
    it('should succeed in loggin in new User', async () => {
        const data = {username: 'Bob', password: 'thebuilder'}
        const newUser = await request(server).post('/api/auth/register')
        .send(data)
        const res = await request(server).post('/api/auth/login').send(data)
        expect(res.status).toBe(200);
    })
})

beforeEach(async () => {
    await db('users').truncate();
})


