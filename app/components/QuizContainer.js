import React, { Component } from 'react';
import Quiz from './Quiz';
import Result from './Result';
import '../styles/QuizContainer.css';
import '../styles/index.css';
import { firestore, auth, functions } from 'firebase';
const db = firestore();
class QuizContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 0,
      question: '',
      answer: '',
      result: false,
      quizQuestions: {},
      loading: true,
      user: auth().currentUser ? auth().currentUser.email : null,
      finish: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  componentWillMount() {
    if (this.state.user) {
      db.collection('answers').doc(this.state.user).get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            questionId: doc.data().nextQuestionId || 0
          });
        }
      });
      db.collection('questions').doc('quiz-test').get()
      .then(doc => {
        if (doc.exists) {
          const quizQuestions = doc.data();
          if (quizQuestions.isQuizActive) {
            this.setState({
              quizQuestions,
              question: quizQuestions.questions[0],
              loading: false
            });
          } else {
            this.setState({ loading: false });
          }
        } else {
          this.setState({ loading: false });
        }
      }
    );
    }
  }

  handleAnswerChange(event) {
    this.setUserAnswer(event.currentTarget.value);

  }

  onSubmit(event) {
    // functions().useFunctionsEmulator('http://localhost:5000');
    var addMessage = functions().httpsCallable('addMessage');
    addMessage(this.state).then((result) => {
      this.setState({ result: result.data.result });
      if (result.data.result) {
        db.collection('answers').doc(this.state.user)
          .set({
            nextQuestionId: this.state.questionId + 1,
            lastAnswerTimeStamp: new Date().getTime()
          }, {merge:true});
        setTimeout(() => this.setNextQuestion(), 3000);
      }
    });
  }

  setUserAnswer(answer) {
    this.setState({ answer });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    console.log(questionId);
    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.quizQuestions.questions[counter],
      answer: '',
      result: false
    });
  }

  finishQuiz() {
    return <Result>Congratulations, you've finished the quiz.</Result>;
  }

  renderQuiz() {
    if (this.state.loading) {
      return <h6> Loading Quiz...</h6>
    }
    if (!this.state.quizQuestions.questions && !this.state.loading) {
      return <h5>This quiz is not active yet.</h5>;
    }
    if (this.state.questionId + 1 > this.state.quizQuestions.questions.length) {
      return this.finishQuiz();
    }
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.questions.length}
        onAnswerChange={this.handleAnswerChange}
        onSubmit={this.onSubmit}
      />
    );
  }

  renderResult() {
    return <Result>Your answer was correct. You'll be redirected to next Question.</Result>;
  }

  render() {
    if(!auth().currentUser) {
      return <h4 className="App-header">You are not logged in!</h4>;
    }
    return (
      <div>
        <div className="App-header">
          <h2>Rotaract Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizContainer;
