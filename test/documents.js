process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "docuements";

describe('Documents', () => {
    describe('GET /documents', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/documents")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.forEach((item) => {
                        item.should.have.property("name");
                        item.should.have.property("content");
                    })
                    done();
                });
        });
    });

    describe('GET /documents/one/:id', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/documents/one/632045cd6df109b78166739a")
                .end((err, res) => {
                    res.should.have.status(202);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.forEach((item) => {
                        item.should.have.property("name");
                        item.should.have.property("content");
                    })
                    done();
                });
        });
    });

    describe('GET /documents/update/632045cd6df109b78166739a/Anna/heeej', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/documents/update/632045cd6df109b78166739a/Anna/heeej")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('GET /documents/init', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/documents/init")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /documents', () => {
        it('201 Creating new document', (done) => {
            let document = {
                name: "Fabian",
                content: "sakta men säkert vandrade vi över floden",
            };

            chai.request(server)
                .post("/documents")
                .send(document)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.name.should.equal("Fabian");
                    done();
                });
        });
    });
});