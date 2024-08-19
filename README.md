## Main Function
```getLearnerData()``` returns an array of objects containing a leaner's overall average score as well as their individual scores in decimal form
## Helper Functions
* ```isDue()``` returns a boolean determining whether or not the assignment is due
* ```calculateScore()``` returns the score in decimal form of a learner's submission, taking account of the submission date
* ```updateLearnerScores()``` returns a status update when building an object for that specific learner, if any errors occur it will print out the error message in the console
## Error Handling
* Try catch blocked whether the scores_possible is either 0 or a string
* Try catch blocked whether score received is not a number (NaN) 
* If else statement when comparing assignment_group.course ID and course ID
