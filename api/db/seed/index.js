require('../conn');
const User = require('../../models/user');
const Skill = require('../../models/skill');
const Rate = require('../../models/rate');
const createUsers = require('./user');
const createSkills = require('./skill');
const createRates = require('./rate');

const ExecSeed = async () => {
    await Promise.all([
        Skill.deleteMany({}),
        User.deleteMany({}),
        Rate.deleteMany({}),
    ]);

    createUsers();
    createSkills();
    createRates();
    console.log('seeding DB DONE!');
    console.log('you can now exit this program using ctrl c');
}

ExecSeed();