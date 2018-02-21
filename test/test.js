const server = require('../server/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('route /sizes', () => {
    it('it should return an array', (done) => {
      chai.request(server)
          .get('/sizes')
          .end((err, res) => {
              res.body.should.be.a('array');
            done();
          });
    });
    it('it should return an array of length 6', (done) => {
      chai.request(server)
          .get('/sizes')
          .end((err, res) => {
              res.body.length.should.be.eql(6);
            done();
          });
    });
    it('it should return all current sizes', (done) => {
      chai.request(server)
          .get('/sizes')
          .end((err, res) => {
              res.body.should.eql([{"id":1,"name":"rofl_size","price":0.99},{"id":2,"name":"S","price":9.99},{"id":3,"name":"M","price":16.99},{"id":4,"name":"L","price":22.99},{"id":5,"name":"XL","price":31.99},{"id":6,"name":"Galactical","price":750.99}]);
            done();
          });
    });
});

describe('route /crusts', () => {
    it('it should return an array', (done) => {
      chai.request(server)
          .get('/crusts')
          .end((err, res) => {
              res.body.should.be.a('array');
            done();
          });
    });
    it('it should return an array of length 6', (done) => {
      chai.request(server)
          .get('/crusts')
          .end((err, res) => {
              res.body.length.should.be.eql(6);
            done();
          });
    });
    it('it should return all current crusts', (done) => {
      chai.request(server)
          .get('/crusts')
          .end((err, res) => {
              res.body.should.eql([{"id":1,"name":"Thin Crust","price":10},{"id":2,"name":"Thick Crust","price":10},{"id":3,"name":"Pan Crust","price":10},{"id":4,"name":"Deep Crust","price":10},{"id":5,"name":"Cheese Filled Crust","price":10},{"id":6,"name":"Stuffed Filled Crust","price":10}]);
            done();
          });
    });
});

describe('route /toppings', () => {
    it('it should return an array', (done) => {
      chai.request(server)
          .get('/toppings')
          .end((err, res) => {
              res.body.should.be.a('array');
            done();
          });
    });
    it('it should return an array of length 18', (done) => {
      chai.request(server)
          .get('/toppings')
          .end((err, res) => {
              res.body.length.should.be.eql(18);
            done();
          });
    });
    it('it should return all current toppings', (done) => {
      chai.request(server)
          .get('/toppings')
          .end((err, res) => {
              res.body.should.eql([{"id":1,"name":"pepperoni","price":2},{"id":2,"name":"mushrooms","price":1.5},{"id":3,"name":"jalapenos","price":1},{"id":4,"name":"bell peppers","price":1.25},{"id":5,"name":"green peppers","price":1.25},{"id":6,"name":"onions","price":0.75},{"id":7,"name":"sausage","price":0.75},{"id":8,"name":"bacon","price":5.75},{"id":9,"name":"extra cheese","price":1.75},{"id":10,"name":"blue cheese","price":8.75},{"id":11,"name":"black olives","price":2.25},{"id":12,"name":"pineapple","price":4.5},{"id":13,"name":"spinach","price":1.15},{"id":14,"name":"red caviar","price":5.65},{"id":15,"name":"black caviar","price":10},{"id":16,"name":"royal golden caviar","price":94.31},{"id":17,"name":"Saffron","price":371.49},{"id":18,"name":"traffels","price":371.49}]);
            done();
          });
    });
});

// describe('route /toppings', () => {
//     it('it should return an array', (done) => {
//       chai.request(server)
//           .get('/toppings')
//           .end((err, res) => {
//               res.body.should.be.a('array');
//             done();
//           });
//     });
// });
