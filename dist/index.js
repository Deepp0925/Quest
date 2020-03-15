"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jobs_1 = require("./Jobs");
const LinksJobs = new Jobs_1.Jobs();
console.log("Total Reward(Rupees): ", LinksJobs.TotalReward());
console.log();
console.log("Number of Quests: ", LinksJobs.NumOfJob());
console.log();
console.log("Jobs: ", LinksJobs.Jobs());
