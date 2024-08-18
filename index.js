// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
  //testing
  {
    learner_id: 150,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-06",
      score: 130,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0 // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833 // late: (140 - 15) / 150
  //   }
  // ];

  // return result;

  //checks to see if specific assignment is due
  function isDue(aDueDate) {
    try {
      let currentDate = new Date();
      let assignmentDate = new Date(aDueDate);
      if (currentDate < assignmentDate) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return error;
    }
  }

  //calculates learner's score for that specific assignment
  function calculateScore(score, sDate, aDate, pointsPossible) {
    try {
      let subDate = new Date(sDate);
      let assiDate = new Date(aDate);
      if (isNaN(score)) throw "ERROR: score is not a valid number, omitting...";
      subDate > assiDate ? (score -= pointsPossible * 0.1) : score;
      return score;
    } catch (error) {
      return error;
    }
  }

  //updates scores of specific learner object based on their assignment submission
  function updateLearnerScores(submission, assignments) {
    for (let assignment of assignments) {
      if (submission.assignment_id === assignment.id) {
        if (isDue(assignment.due_at)) {
          console.log("==================\n     IS DUE\n==================");
          try {
            if (isNaN(assignment.points_possible))
              throw "ERROR: Points possible is not a valid number, omitting...";
            if (assignment.points_possible <= 0)
              throw "ERROR: Points possible is less than or equal to zero, omitting...";
            if (
              isNaN(
                calculateScore(
                  submission.submission.score,
                  submission.submission.submitted_at,
                  assignment.due_at,
                  assignment.points_possible
                )
              )
            )
              throw `Having issues calculating learner's score; ${calculateScore(
                submission.submission.score,
                submission.submission.submitted_at,
                assignment.due_at,
                assignment.points_possible
              )}`;
            learner[assignment.id] =
              calculateScore(
                submission.submission.score,
                submission.submission.submitted_at,
                assignment.due_at,
                assignment.points_possible
              ) / assignment.points_possible;
            totalScore += assignment.points_possible;
            currentScore += calculateScore(
              submission.submission.score,
              submission.submission.submitted_at,
              assignment.due_at,
              assignment.points_possible
            );
          } catch (error) {
            return error;
          }
        } else {
          console.log("==================\n   NOT DUE YET\n==================");
          break;
        }
      }
    }
    return `Finished update: ${JSON.stringify(learner)}`;
  }

  const result = [];
  let totalScore = 0;
  let currentScore = 0;
  let currentLearner = submissions[0].learner_id;
  let learner = {
    id: currentLearner,
  };
  learner.id = currentLearner;
  if (ag.course_id === course.id) {
    //parse through assignment group to see if its valid
    for (let i = 0; i < submissions.length; i++) {
      if (submissions[i].learner_id !== currentLearner) {
        //calculates average score for all assignments for that specific learner
        learner.avg = currentScore / totalScore;
        result.push(learner);
        //Set learner to an empty object
        learner = {};
        currentLearner = submissions[i].learner_id;
        learner.id = currentLearner;
        totalScore = 0;
        currentScore = 0;
      }
      /**
       * Updates a learner's score percentage for that specific assignment submitted
       */
      const statusLog = updateLearnerScores(submissions[i], ag.assignments);
      //print out the result after parsing through that particular assignment and submission
      console.log(statusLog);
    }
    learner.id = currentLearner;
    learner.avg = currentScore / totalScore;
    result.push(learner);
  } else {
    return "The course id of the assignment group is not the same as the course provided.";
  }
  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
