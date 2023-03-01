// import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";

chai.use(chaiHttp);
const { expect } = chai;

describe("Testing team route", () => {
  it("Testing GET", async () => {
    //Arrange
    const teamListMock = [
      {
        id: 89,
        teamName: 'Galo Doido',
      },
      {
        id: 13131313,
        teamName: 'Galão da Massa'
      }
    ];

    //Action
    const response = await chai.request(app).get("/teams");

    //Arrange
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(teamListMock);
  });
});

