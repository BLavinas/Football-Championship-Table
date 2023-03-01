import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";

import { Response } from "superagent";
import ITeams from '../api/interfaces/ITeams'
import { Model } from "sequelize";

chai.use(chaiHttp);
const { expect } = chai;

describe("Testing team route", () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  afterEach(() => {
    sinon.restore();
  });

  // before(async () => {
  //   sinon
  //     .stub(TeamModel, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as TeamModel);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it("Testing reading all teams", async () => {
    // Arrange
    // const teamListMock: ITeams[] = [{
    //   id: 1313,
    //   teamName: 'Galo Doido'
    // }]
    // sinon.stub(Model, 'findAll').resolves(teamListMock)

    //Action
    chaiHttpResponse = await chai.request(app).get("/teams");

    //Arrange
    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.be.equal(teamListMock);
  });
  it("Testing success reading team by id", async () => {
    //Arrange
    // const teamListMock = {
    //   id: 89,
    //   teamName: "Galo Doido",
    // };
    //Action
    const response = await chai.request(app).get("/teams/1");
    //Arrange
    expect(response.status).to.be.equal(200);
    // expect(response.body).to.deep.equal(teamListMock);
  });
});

