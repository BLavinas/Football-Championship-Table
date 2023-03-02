import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import { Response } from "superagent";
import UserModel from '../database/models/UserModel'
// import userMock from './Mocks/UserMock'

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing User route', () => {
  let chaiHttpResponse: Response;
  // before(async () => {
    // sinon.stub(UserModel, "create").resolves(userMock as UserModel);
  // });

   after(() => {
     (UserModel.findOne as sinon.SinonStub).restore();
   });
   
  it('Test success login', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: 'user@user.com', password: '1234657'});
    expect(chaiHttpResponse.status).to.be.equal(200);
  })
})