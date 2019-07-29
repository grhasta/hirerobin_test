const mongoose = require('mongoose');

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_DB = process.env.MONGO_DB || 'hirerobin'
const MONGO_DB_TEST = process.env.MONGO_DB_TEST || 'hirerobintest'
const MONGO_PORT = process.env.MONGO_PORT || '27017'


if (process.env.NODE_ENV == 'test') {
    module.exports = mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_TEST}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});    
} else {
    module.exports = mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
        useNewUrlParser: true,
        useCreateIndex: true
    }); 
}
