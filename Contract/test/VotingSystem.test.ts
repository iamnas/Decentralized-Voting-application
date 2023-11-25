
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("VotingSystem", function () {
  let VotingSystem: any;
  let votingSystem: any;
  let admin: any, voter1: any, voter2: any;

  beforeEach(async function () {
    [admin, voter1, voter2] = await ethers.getSigners();
    VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy();
    // await votingSystem.deployed();
  });

  it("should change admin", async function () {
    const newAdmin = voter1.address;
    await votingSystem.connect(admin).changeAdmin(newAdmin);
    expect(await votingSystem.admin()).to.equal(newAdmin);
  });

  it("should not allow non-admin to change admin", async function () {
    const newAdmin = voter1.address;
    await expect(
      votingSystem.connect(voter1).changeAdmin(newAdmin)
    ).to.be.revertedWith("Only admin can call this function");
  });

  it("should not allow changing admin to zero address", async function () {
    await expect(
      votingSystem.connect(admin).changeAdmin(ethers.ZeroAddress)
    ).to.be.revertedWith("Invalid address");
  });

  // it("should set vote time", async function () {
  //   const startTime = 100;
  //   const endTime = 200;
  //   const start = (await time.latest())+100
  //   await votingSystem.connect(admin).setVoteTime(startTime, endTime);
  //   expect(await votingSystem.isVotingStart()).to.be.true;
  //   expect(await votingSystem.startTime()).to.equal(start);
  //   expect(await votingSystem.endTime()).to.equal(endTime);
  // });

  it("should not allow non-admin to set vote time", async function () {
    const startTime = 100;
    const endTime = 200;
    await expect(
      votingSystem.connect(voter1).setVoteTime(startTime, endTime)
    ).to.be.revertedWith("Only admin can call this function");
  });

  it("should not allow setting vote time with invalid parameters", async function () {
    await expect(
      votingSystem.connect(admin).setVoteTime(0, 0)
    ).to.be.revertedWith("Time should be greater than 0");

    await expect(
      votingSystem.connect(admin).setVoteTime(100, 3600)
    ).to.be.revertedWith("Time should be less than an hour");
  });

  it("should calculate the result", async function () {
    const candidateName1 = "Candidate 1";
    const candidateName2 = "Candidate 2";
    await votingSystem.connect(admin).addCandidate(candidateName1);
    await votingSystem.connect(admin).addCandidate(candidateName2);
    await votingSystem.connect(admin).setVoteTime(1, 10);
    await votingSystem.connect(voter1).vote(1);
    await votingSystem.connect(voter2).vote(1);

    await time.increase(15);

    await votingSystem.connect(admin).result();
    const winner = await votingSystem.winner();
    expect(winner.name).to.equal(candidateName2);
  });

  it("should not allow non-admin to calculate the result", async function () {
    await expect(votingSystem.connect(voter1).result()).to.be.revertedWith(
      "Only admin can call this function"
    );
  });
});
