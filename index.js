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
    let currentDate = new Date();
    let assignmentDate = new Date(aDueDate);
    if (currentDate < assignmentDate) {
      return false;
    } else {
      return true;
    }
  }

  //calculates learner's score for that specific assignment
  function calculateScore(score, sDate, aDate, pointsPossible) {
    let subDate = new Date(sDate);
    let assiDate = new Date(aDate);
    subDate > assiDate ? (score -= pointsPossible*0.10) : score;
    return score;
  }

  const result = [];
  let totalScore = 0;
  let currentScore = 0;
  let currentLearner = submissions[0].learner_id;
  let learner = {};
  if (ag.course_id === course.id) {
    //parse through assignment group to see if its valid
    for (let i = 0; i < submissions.length; i++) {
      if (
        submissions[i].learner_id !== currentLearner
      ) {
        learner.id = currentLearner;
        learner.avg = currentScore / totalScore;
        result.push(learner);
        learner = {};
        currentLearner = submissions[i].learner_id;
        totalScore = 0;
        currentScore = 0;
      }
      //checks to see if assignment from the submission is due yet
      for (let assignment of ag.assignments) {
        if (submissions[i].assignment_id === assignment.id) {
          if (isDue(assignment.due_at)) {
            console.log("IS DUE");
            learner[assignment.id] =
              calculateScore(
                submissions[i].submission.score,
                submissions[i].submission.submitted_at,
                assignment.due_at,
                assignment.points_possible
              ) / assignment.points_possible;
            totalScore += assignment.points_possible;
            currentScore += calculateScore(
              submissions[i].submission.score,
              submissions[i].submission.submitted_at,
              assignment.due_at,
              assignment.points_possible
            );
          } else {
            console.log("NOT DUE YET");
          }
        }
      }
    }
    learner.id = currentLearner;
    learner.avg = currentScore / totalScore;
    result.push(learner);
  } else {
    console.error(
      "The course id of the assignment group is not the same as the course provided."
    );
  }
  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
