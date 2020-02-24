const db = require('../database/dbConfig');

module.exports = {
    findUser,
    add
}

function findUser(id) {
    return db('auth')
        .where({ id })
        .first()
}

function add(user) {
    const [id] = await db('auth').insert(user)

    return findUser(id);
}