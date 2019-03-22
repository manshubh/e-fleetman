const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addMessage = functions.https.onCall((data, context) => {
  const answers = {
    0:'answerText'
  };
  return {
    result: answers[data.questionId] && data.answer && answers[data.questionId] === data.answer
  };
});

// exports.dbRefOnWriteEvent = functions.firestore
//   .document('/answers/{user}/{quizId}/answerSet')
//   .onWrite((change, context) => {
//     const data = change.after.data();
//     console.log(change.after.data());
//     admin.initializeApp(functions.config().firebase);
//     return admin.firestore()
//     .doc('/answersToMatch/quiz-test')
//     .get().then(doc => {
//       const answers = doc.data();
//       let points = 0;
//       Object.keys(answers).forEach(choice => {
//         if (answers[choice] === data[choice]) {
//           points += 5;
//         }
//       })
//       const leaderboard = admin.firestore()
//         .doc('/leaderboard/board')
//       // eslint-disable-next-line promise/no-nesting
//       return leaderboard.get().then(board => {
//         const result = board.data();
//         const score = {
//           [context.params.user]: {
//             points,
//             retries: result[context.params.user] ? result[context.params.user].retries + 1 : 0
//           }
//         };
//         return leaderboard.set(score, { merge: true });
//       });
//     });
// });