"use strict";

var chai = require('chai');

var chaiHttp = require('chai-http');

var expect = require('chai').expect;

chai.use(chaiHttp);
var url = 'http://localhost:3000';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmViYTM5Mjc5Zjg0NTI2MDcwMjk3NCIsImlhdCI6MTY0NzI5Mjg3MSwiZXhwIjoxNjQ3Mzc5MjcxfQ.mVDvz2oCYxAV_P7--AmknRzeTY5zBtytnjAwMDbn2Wc';
var dna1 = {
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
};
var dna2 = {
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGACGA", "CCCATA", "TCACTG"]
};
var invalid = {
  "dna": ["ATGCGA", "CAGTGC", "TTZTGT", "AGAAGG", "CCCCTA", "TCACTG"]
};
describe('has mutation: ', function () {
  it('should return  mutant : 1 if its amutation ', function (done) {
    chai.request(url).post('/api/adn/mutation').send(dna1).set('x-access-token', token).end(function (err, res) {
      expect(res.body).to.have.property('mutant', 1);
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('has mutation: ', function () {
  it('should return  mutant : 0 if its amutation ', function (done) {
    chai.request(url).post('/api/adn/mutation').send(dna2).set('x-access-token', token).end(function (err, res) {
      console.log(res.body);
      expect(res.body).to.have.property('mutant', 0);
      expect(res).to.have.status(403);
      done();
    });
  });
});
describe('has mutation: ', function () {
  it('should return  Hay un caracter invalido, solo se permiten los siguientes caracteres: A, T, C, G ', function (done) {
    chai.request(url).post('/api/adn/mutation').send(invalid).set('x-access-token', token).end(function (err, res) {
      console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.equal('Hay un caracter invalido, solo se permiten los siguientes caracteres: A, T, C, G');
      done();
    });
  });
});