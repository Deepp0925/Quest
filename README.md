# Link's Quests
A solution to the problem given by IGN Code Foo 2020

- [Problem](#problem)
- [Solution](#solution)

# Answer
Here is what I got once I ran my program

`Total Reward(Rupees):  5970` 

`Number of Quests:  8`  

`Jobs:  -- Array of jobs by start date --`

# How to run
Just download the repository and compile the typescript`npm run compile`, followed by running the command `npm start` in the root project directory

# Problem
The following problem comes IGN code Foo 2020

A new age has dawned in Hyrule. With Gannon defeated and peace once again restored, Link has found himself without a job, and unfortunately with not much to do. There is only so many times one can play Bombchu Bowling. The hero of time now spends his days sleeping and loafing around Hyrule Castle. To make matters worse, Link has run out of rupees. It’s time for Link to save what’s left of his reputation, and to again start earning his fair share of rupees. What better way to do so than with some quests! Princess Zelda, being the legendary friend she is, has managed to help Link acquire a list of available quests. All that’s left to do is tackle them, but where to start?

Using the provided quest board, create a program that will determine the quests Link should embark on in order to earn the maximum amount of rupees possible in a month’s time.

- Please use the information in the [provided quest board](https://media.ignimgs.com/code-foo/2020/files/quests_for_question.pdf) as your quest list (this can also be found in Quests.ts file)
- Duration refers to how long it will take Link to finish a quest. This value is represented in days. I.e if the quest starts on the 5th and takes 3 days, Link will finish on the 8th
- Link can only take on one quest at a time and must finish the quest he starts before beginning another
- Again, Link cannot act on quests of overlapping durations. Meaning if the duration of Quest A overlaps with Quest B, he must choose one or the other
- A quest can be started on the same day one is completed
- The month Link has to complete his quests starts on the 1st and ends on the 31st
- Determine and display the maximum amount of rupees Link can earn from the quest board and the quests that Link should ultimately accept. ( given the month of time he has to work with )
- Please explain how you implemented your solution. Is your solution successful with other quests boards? How efficient is your solution?

#	Solution
**pay ratio** here is used as job's daily average rupee = 
Reward / Duration

1. Find jobs with maximum pay ratio
2. Go through up to next three jobs and see which one has a higher pay ratio
3. This sometimes could lead Link having to rest for a day or two
4. Once the schedule is generated, go through the list and check if there are other quests with higher reward (not pay ratio) that can be completed before beginning the new quest.

This solution is viable because unlike trial and error solution that produces multiple result and returns the schedule with maximum reward can sometimes not be able to find jobs that can be done in shorter duration time. Moreover, that solution would take twice the amount of work for the coder and might not even function efficiently, if not slowing down the entire program.
