const Skill = require('../../models/skill');

const createSkills = async () => {
    const skill1 = new Skill({
        name: 'Front End Development',
    });

    const skill2 = new Skill({
        name: 'Database Administrator',
    });

    const skill3 = new Skill({
        name: 'Back End Development',
    });

    const skill4 = new Skill({
        name: 'Customer Journey / UX',
    });

    const skill5 = new Skill({
        name: 'Product Development',
    });

  
    await skill1.save();
    await skill2.save();
    await skill3.save();
    await skill4.save();
    await skill5.save();
};

module.exports = createSkills