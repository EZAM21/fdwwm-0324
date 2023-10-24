import process from "process";
//au cours du test, la variable env est réglée sur test
process.env.MODE_ENV = 'test'

import chai from "chai";
import chaiHttp from "chai-http";
import { it } from "mocha";
let should = chai.should()
import { app } from "../index.js";

chai.use(chaiHttp);

describe("./.", () => {
        it("it should get code 200", (done) => {
                chai.request(app)
                .get("/")
                .end((err, res) => {
                        res.should.have.status(200);
                        done();
                });
        });
});