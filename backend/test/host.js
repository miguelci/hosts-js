const db = require('./../api/db.js');
const Host = require('./../api/models/host');

const URL = 'http://localhost:4000'; 

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Hosts', () => {
    
  describe('/GET host', () => {
      it('it should GET all the hosts', (done) => {
        chai.request(URL)
            .get('/hosts')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
      });
  });

  describe('/POST host fail', () => {
    it('it should POST an host and fail', (done) => {
        let host = {'name':''};
        chai.request('http://localhost:4000')
            .post('/hosts')
            .send(host)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message');
              res.body.should.have.property('message').eql(['name needs to be filled']);
              done();
          });
    });
    });

    describe('/POST host success', () => {
        let host = {'name':'test user'};
        it('it should POST an host', (done) => {
            chai.request(URL)
                .post('/hosts')
                .send(host)
                .end((err, res) => {
                    res.should.have.status(201);
                    host = res.body.id;
                    done();
                });
        });

        after(done => {
            chai.request(URL)
            .delete('/hosts/' + host)
            .end((err, res) => {
                res.should.have.status(204);
                host = res.body.id;
                done();
            });
        })

    });

    describe('/GET host success', () => {
        it('it should GET the host', (done) => {
            chai.request(URL)
                .get('/hosts/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    host = res.body.hosts[0];
                    done();
                });
        });
    });


    describe('/POST a property fail', () => {
        let host = {name: 'test post property'};
        let property = {};
        before(done => {
            chai.request(URL)
            .post('/hosts')
            .send(host)
            .end((err, res) => {
                res.should.have.status(201);
                host.id = res.body.id;
                done();
            });
        });

        it('it should POST a property and fail', (done) => {
            chai.request(URL)
                .post('/hosts/' + host.id + '/properties/')
                .send(property)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql(
                        ['numberOfBathrooms is required',
                        'numberOfBedrooms is required',
                        'income is required',
                        'line_one is required',
                        'line_four is required',
                        'post_code is required',
                        'city is required',
                        'country is required' 
                    ]);
                    done();
                });
        });
        
        after(done => {
            chai.request(URL)
            .delete('/hosts/' + host.id)
            .end((err, res) => {
                res.should.have.status(204);
                host = res.body.id;
                done();
            });
        })

    });

    describe('/POST a property successfully', () => {
        let host = {name: 'test post property'};
        before(done => {
            chai.request(URL)
            .post('/hosts')
            .send(host)
            .end((err, res) => {
                res.should.have.status(201);
                host.id = res.body.id;
                done();
            });
        });

        it('it should POST a property and succeed', (done) => {

            let property = {
                "airbnb_id": 939721,
                "numberOfBathrooms": 1,
                "numberOfBedrooms": 1,
                "income": "123",
                "host_id": host.id,
                "line_one": "Line One",
                "line_two": "",
                "line_three": "",
                "line_four": "Line four",
                "post_code": "Post Code",
                "city": "City",
                "country": "Country"
            };

            chai.request(URL)
                .post('/hosts/' + host.id + '/properties/')
                .send(property)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').have.property('id').to.be.an('number');
                    done();
                });
        });
        
        after(done => {
            chai.request(URL)
            .delete('/hosts/' + host.id)
            .end((err, res) => {
                res.should.have.status(204);
                host = res.body.id;
                done();
            });
        })

    });

});