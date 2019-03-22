import React from 'react';
import '../styles/index.css'

function Question(props) {
  return (
    <div>
      <h2 className="question">{props.content.text}</h2>
      <h4 className="question">Hint: {props.content.hint}</h4>
      {props.content.img ? <center><img src={props.content.img}></img></center> : null}
    </div>
  );
}

export default Question;
