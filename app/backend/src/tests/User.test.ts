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

   afterEach(() => {
     sinon.restore();
   });

  it('Test success login', async () => {
    const userInfo = {email: 'user@user.com', password: 'secret_user'}
    chaiHttpResponse = await chai.request(app).post("/login").send(userInfo);
    expect(chaiHttpResponse.status).to.be.equal(200);
  })
})