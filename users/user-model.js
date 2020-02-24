const db = require('../database/dbConfig');

module.exports = {
    findUser,
    add
}

function findUser(id) {
    return db('users')
        .where({ id })
        .first()
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findUser(id);
}