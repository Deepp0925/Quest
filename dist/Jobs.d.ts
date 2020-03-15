import { IQuest } from "./Interfaces";
export declare class Jobs {
    private LinksJobs;
    constructor();
    Jobs(): IQuest[];
    NumOfJob(): number;
    TotalReward(): number;
    adjustRatio(): void;
    nextJob(startDate: number, maxLoop: number): IQuest | undefined;
    findBestSchedule(): void;
    adjustForBetterReward(): void;
}
