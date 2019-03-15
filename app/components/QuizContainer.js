import React, { Component } from 'react';
import Quiz from './Quiz';
import Result from './Result';
import '../styles/QuizContainer.css';
import '../styles/index.css';
import { firestore, auth } from 'firebase';
const db = firestore();
class QuizContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 0,
      question: '',
      answerOptions: [],
      answer: '',
      answers: {},
      result: '',
      quizQuestions: {},
      loading: true
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    db.collection('questions').doc('quiz-test').get()
      .then(doc => {
        if (doc.exists) {
          const quizQuestions = doc.data();
          if (quizQuestions.isQuizActive) {
            const shuffledAnswerOptions = quizQuestions.questions.map(question =>
              this.shuffleArray(question.answers)
            );
            this.setState({
              quizQuestions,
              question: quizQuestions.questions[0].question,
              answerOptions: shuffledAnswerOptions[0],
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

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId + 1 < this.state.quizQuestions.questions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.sendResults(), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answers: {
        ...state.answers,
        [state.questionId]: answer
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.quizQuestions.questions[counter].question,
      answerOptions: this.state.quizQuestions.questions[counter].answers,
      answer: ''
    });
  }

  sendResults() {
    db.collection('answers').doc('quiz-test').set(this.state.answers);
    this.setState({ result: 'Submitted' });
  }

  renderQuiz() {
    if (this.state.loading) {
      return <h6> Loading Quiz...</h6>
    }
    if (!this.state.quizQuestions.questions && !this.state.loading) {
      return <h5>This quiz is not active yet.</h5>;
    }
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.questions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Rotaract Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizContainer;
