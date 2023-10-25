//Le module process est utilisé pour accéder aux variables d'environnement. Ici, il est utilisé pour définir la variable d'environnement NODE_ENV sur "test".
import process from "process";
//au cours du test, la variable env est réglée sur test
process.env.MODE_ENV = 'test'
//bibliothèques de test utilisées pour les assertions et les tests d'API HTTP.
import chai from "chai";
import chaiHttp from "chai-http";
import { it } from "mocha";//fonction it de mocha
let should = chai.should()//permet de vérifier si les valeurs correspondent à ce qui est attendu.
import { app } from "../index.js";

chai.use(chaiHttp);

//Chaque description de test (describe) contient un ou plusieurs tests (it) qui vérifient un aspect spécifique de l'API.
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

 /*
    * Tester la route /custom-api qui doit renvoyer un json
    */
 describe('/custom-api', () => {
        it('it should GET code 200', (done) => {
            chai.request(app)
                .get('/custom-api')
                .end((err, res) => {
                    res.should.have.status(200);      
                    res.should.be.json;                                  
                    done();                    
                });
        });
    });

    /*
    * Tester la route /login avec de bons identifiants comme okjojo@jojo.com et le mot de passe 12345
    */
    describe('/login', () => {
        it('it should GET code 200', (done) => {
            chai.request(app)
                .post('/login')
                .send({email: 'okjojo@jojo.com', password: '12345'})
                .end((err, res) => {                    
                    res.should.have.status(200);                                               
                    done();
                })
        })
    })