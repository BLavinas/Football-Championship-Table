import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import { Response } from "superagent";
import TeamModel from '../database/models/TeamModel'
import teamMock from './Mocks/TeamMock'

chai.use(chaiHttp);
const { expect } = chai;

describe("Testing team route", () => {
   /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamMock as TeamModel[]);
      sinon.stub(TeamModel, "findOne").resolves(teamMock[0] as TeamModel);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findOne as sinon.SinonStub).restore();
  })
  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it("Testing reading all teams", async () => {
    // Arrange
    // Action
    chaiHttpResponse = await chai.request(app).get("/teams");

    //Arrange
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamMock);
  });
  it("Testing reading team by id", async () => {
    //Arrange
    //Action
    chaiHttpResponse = await chai.request(app).get("/teams/1");
    //Arrange
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamMock[0]);
  });
});

