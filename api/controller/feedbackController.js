const Feedback = require('../models/feedback');
const Rate = require('../models/rate');
const Skill = require('../models/skill');
const User = require('../models/user');


exports.feedback = async function (req, res, next) {

  try {
    const user = await User.findOne({email: req.email}).exec()
    const found_feedback = await Feedback.findOne({ 
                                reviewer: user.id, 
                                reviewed: req.body.reviewed_id})
                                .exec()
    
    if (!user.reviewer){ 
      res.status(401).json({ error: 'User is not reviewer' });
  
    } else if (found_feedback!=null) {
      res.status(401).json({ error: 'You already reviewd this person' });
  
    } else {
      const feedback = new Feedback({
          rate: req.body.rate,
          reviewer_capacity: req.body.reviewer_capacity,
          origin: req.body.origin,
          contribution: req.body.contribution,
          skill: req.body.skill,
          key_strength: req.body.key_strength,
          reviewer: user.id,
          reviewed: req.body.reviewed_id,
      });
      
      if (req.body.offers==true) { user.offers=true; await user.save()}
      const result = await feedback.save();

      res.status(200).send({
          success: 'true',
          data: result
      });
    }

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.rate_list = async function(req, res, next) {

  try {
    const rate = await Rate.find().exec()

    res.status(200).send({
      success: 'true',
      data: rate
    });

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.skill_list = async function(req, res, next) {

  try {
    const skill = await Skill.find().exec()

    res.status(200).send({
      success: 'true',
      data: skill
    });

  } catch (error) {
    res.status(500).json({ error: error });
  }
}