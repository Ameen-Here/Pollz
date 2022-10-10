import React from "react";

import "./StudentPollingPage.css";

const StudentPollingPage = () => {
  const TEMP_DATA = {
    question: "How many movies Shah Rukh Khan featured in?",
    options: [91, 23, 66, 42],
  };

  const TEMP_DATA_POLL = {
    options: [91, 23, 66, 42],
    answers: { 91: 23, 23: 42, 66: 10, 42: 100 },
    totalAnswers: 155,
    percentage: { 91: 14.8, 23: 27.1, 66: 6.5, 42: 64.5 },
    isFullyAnswered: false,
  };

  const submitHandler = () => {
    for (let i = 0; i < TEMP_DATA.options.length; i++) {
      if (document.getElementById(TEMP_DATA.options[i]).checked) {
        console.log(document.getElementById(TEMP_DATA.options[i]).id);
      }
    }
  };
  return (
    <div className="card">
      {/* <h3>Waiting for teacher to ask question...</h3> */}
      {/* <h2 className="card__question">{TEMP_DATA.question}</h2>
      <ul className="card__options">
        {TEMP_DATA.options.map((option) => (
          <li>
            <input
              key={option}
              type="radio"
              id={option}
              name="radio-group"
              className="card__options"
            />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </ul>
      <button className="card__button" onClick={submitHandler}>
        Submit Answer
      </button> */}
      <h2>Polling Results</h2>

      {TEMP_DATA_POLL.options.map((option) => (
        <div className="card__poll-result">
          {option}
          <span
            className="percentage-bar"
            style={{
              width: `${TEMP_DATA_POLL.percentage[option]}%`,
            }}
          ></span>
          <span className="percentage-value">
            {(
              (TEMP_DATA_POLL.answers[option] / TEMP_DATA_POLL.totalAnswers) *
              100
            ).toFixed(1)}
            %
          </span>
        </div>
      ))}

      <button className="card__button" onClick={submitHandler}>
        Submit Answer
      </button>
    </div>
  );
};

export default StudentPollingPage;
