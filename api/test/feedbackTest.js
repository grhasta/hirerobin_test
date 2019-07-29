process.env.NODE_ENV = 'test';

let User = require('../models/user');
let Feedback = require('../models/feedback');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Users', () => {
    before((done) => {
      User.deleteMany({}, (err) => {});
      Feedback.deleteMany({}, (err) => {});
      done();
    });

    let user = {
      email: 'ana@gmail.com',
      password: 'passwordana'
    };

    let user_reviewer = {
      email: 'budi@gmail.com',
      password: 'passwordbudi',
      reviewer: true
    };

    let feedback_params = {
      "token": '',
      "reviewed_id": '',
      "rate": "5d3d3d0a2701b02bc96dc334",
      "reviewer_capacity": "Supervisor",
      "origin": "Office",
      "contribution": 8,
      "skill": "5d3d3d0a2701b02bc96dc32f",
      "key_strength": "Absolute mad",
      "offers": true
    };

    describe('/POST user', () => {
      it('it sholud register casual user', (done) => {
        chai.request(app)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('user_id');
                feedback_params.reviewed_id = `${res.body.user_id}`
              done();
            });
      });

      it('it sholud register user reviewer', (done) => {
        chai.request(app)
            .post('/api/register')
            .send(user_reviewer)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('user_id');
              done();
            });
      });

      it('it sholud reject user with same email', (done) => {
        chai.request(app)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res).to.be.json;
              done();
            });
      });

      it('it sholud login app', (done) => {
        chai.request(app)
            .post('/api/authenticate')
            .send(user_reviewer)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('token');
                feedback_params.token = `${res.body.token}`
              done();
            });
      });
    });

    describe('/POST feedback', () => {
      it('it sholud reject feedback without login', (done) => {
        chai.request(app)
            .post('/api/feedback')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res).to.be.json;
              done();
            });
      });

      it('it sholud save feedback', (done) => {
        chai.request(app)
            .post('/api/feedback')
            .send(feedback_params)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('success');
              done();
            });
      });

      it('it cant save the same feedback', (done) => {
        chai.request(app)
            .post('/api/feedback')
            .send(feedback_params)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res).to.be.json;
                expect(res.body.error).equal('You already reviewd this person');
              done();
            });
      });
    });
});
