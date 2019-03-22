import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from './Question';
import QuestionCount from './QuestionCount';
import { Button } from '../atoms/Button';

function Quiz(props) {

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <div className="answerLabel">
          <input
            type="text"
            id={props.questionId}
            value={props.answer}
            onChange={props.onAnswerChange}
            placeholder="Enter Your Answer..."
          />
          <Button
            onClick={props.onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

export default Quiz;
