const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Item = require('../models/Item');

const should = chai.should();
chai.use(chaiHttp);

describe('Items', function() {
  this.timeout(5000); // Increase the Mocha timeout so this process can complete

  beforeEach(async () => {
    // Clear the database before each test
    try {
      await Item.deleteMany({});
    } catch (err) {
      console.error(err.message);
    }
  });

  // Test the GET route
  describe('/GET items', () => {
    it('it should GET all the items', (done) => {
      chai.request(server)
        .get('/api/items')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Test the POST route
  describe('/POST item', () => {
    it('it should POST an item', (done) => {
      const item = {
        name: 'Test Item'
      };

      chai.request(server)
        .post('/api/items')
        .send(item)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('createdAt');
          done();
        });
    });
  });
});
