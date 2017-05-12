import React from 'react';


function Result(props) {

  return (
    
      <div>
        Correct answers: <strong>{props.correct}</strong><br/>
        Incorrect answers: <strong>{props.incorrect}</strong><br/>
        Time taken: <strong>{props.time} seconds</strong>
      </div>
    
  );

}

Result.propTypes = {
  correct: React.PropTypes.string.isRequired,
  incorrect: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
};

export default Result;
