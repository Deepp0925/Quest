import { Quests } from "./Quests";
import { IQuest } from "./Interfaces";

export class Jobs {
  private LinksJobs: IQuest[] = Quests;

  constructor() {
    this.adjustRatio();
    this.findBestSchedule();
    this.adjustForBetterReward();
  }

  Jobs() {
    return this.LinksJobs;
  }

  NumOfJob() {
    return this.LinksJobs.length;
  }

  TotalReward(): number {
    let amount = 0;
    this.LinksJobs.map(quest => (amount += quest.reward));
    return amount;
  }

  // adjust ratio based on reward and duration
  adjustRatio() {
    this.LinksJobs.forEach(quest => {
      quest.ratio = Math.floor(quest.reward / quest.duration);
    });

    this.LinksJobs.sort((a, b) => -1 * (a.ratio - b.ratio));
    this.LinksJobs.sort((a, b) => a.duration - b.duration);
    this.LinksJobs.sort((a, b) => a.startDate - b.startDate);
  }

  nextJob(startDate: number, maxLoop: number): IQuest | undefined {
    let loop = 0;
    let nextJob = this.LinksJobs.find(quest => quest.startDate === startDate);

    while (nextJob === undefined && loop <= maxLoop) {
      startDate++;
      nextJob = this.LinksJobs.find(quest => quest.startDate === startDate);
      loop++;
    }

    return nextJob;
  }

  // finds best best schedule based on the ratio
  findBestSchedule() {
    let nextJobStartDate = 1;
    const jobsWithMaxYield: IQuest[] = [];
    const availableQuests = this.LinksJobs;
    const maxUnemployedDays = 2;
    const latestPossibleStartDate = availableQuests.sort(
      (a, b) => -1 * (a.startDate - b.startDate)
    )[0].startDate;

    while (nextJobStartDate <= latestPossibleStartDate) {
      // list of next possible jobs
      const nextPossibleJobs: (IQuest | undefined)[] = [
        this.nextJob(nextJobStartDate, maxUnemployedDays),
        this.nextJob(nextJobStartDate + 1, maxUnemployedDays),
        this.nextJob(nextJobStartDate + 2, maxUnemployedDays)
      ];

      // sort by ratio and get the highest paying job
      nextPossibleJobs.sort((a, b) => (a && b ? -1 * (a.ratio - b.ratio) : 1));

      // adjust next job start date
      nextJobStartDate =
        nextPossibleJobs[0]!.startDate + nextPossibleJobs[0]!.duration;

      // push it job
      jobsWithMaxYield.push(nextPossibleJobs[0]!);
    }

    // finally adjust it the
    this.LinksJobs = jobsWithMaxYield;
  }

  adjustForBetterReward() {
    // this will try to adjust unemployed days to find other jobs based on better reward rather than ratios
    for (let index = 0; index < this.LinksJobs.length - 1; index++) {
      const thisQuest = this.LinksJobs[index];
      const nextQuest = this.LinksJobs[index + 1];

      if (thisQuest && nextQuest) {
        // only perform if duration of quest leave
        if (thisQuest.duration !== nextQuest.startDate - thisQuest.startDate) {
          const durationBetweenStartOfTwoJobs =
            nextQuest.startDate - thisQuest.startDate;
          // only return if reward is higher, has a same start date and finishes before next quest
          const betterQuest = Quests.find(
            quest =>
              quest.startDate === thisQuest.startDate &&
              quest.duration === durationBetweenStartOfTwoJobs &&
              quest.reward > thisQuest.reward
          );

          if (betterQuest) {
            this.LinksJobs[index] = betterQuest;
          }
          // try to find a quest between jobs
          else {
            const thisQuestFinishDate =
              thisQuest.startDate + thisQuest.duration;
            const jobToFindDuration = nextQuest.startDate - thisQuestFinishDate;

            // only perform if there is a gap between quests
            if (nextQuest.startDate !== thisQuestFinishDate) {
              const QuestInBetween = Quests.find(
                quest =>
                  quest.startDate === thisQuestFinishDate &&
                  quest.duration === jobToFindDuration
              );
              if (QuestInBetween) {
                // adds in between quest after the current quest finishes
                this.LinksJobs.splice(index + 1, 0, QuestInBetween);
              }
            }
          }
        }
      }
    }
  }
}
