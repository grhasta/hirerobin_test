const User = require('../../models/user');

const createUsers = async () => {
    const userA = new User({
        _id: '5d3c3f1720f3ea11e67ff9e0',
        email: 'ana@gmail.com',
        password: 'passwordana',
    });

    const userB = new User({
        _id: '5d3c3f1720f3ea11e67ff9e1',
        email: 'budi@gmail.com',
        password: 'passwordbudi',
    });

    const userC = new User({
        _id: '5d3c3f1720f3ea11e67ff9e2',
        email: 'charly@gmail.com',
        password: 'passwordcharly',
        reviewer: true,
    });
  
    await userA.save();
    await userB.save();
    await userC.save();
};

module.exports = createUsers