import React, { useRef, useState } from "react";

const TeacherHomepage = () => {
  const [optionNum, setOptionNum] = useState(2);
  const questRef = useRef();

  const TEMP_DATA_POLL = {
    options: [91, 23, 66, 42],
    answers: { 91: 23, 23: 42, 66: 10, 42: 100 },
    totalAnswers: 155,
    percentage: { 91: 14.8, 23: 27.1, 66: 6.5, 42: 64.5 },
    isFullyAnswered: false,
  };

  const addAnotherOptionHandler = () => {
    const addBtn = document.getElementById("addAnotherBtn");
    const askBtn = document.getElementById("askQuestBtn");
    setOptionNum((prevValue) => ++prevValue);
    addBtn.insertAdjacentHTML(
      "beforebegin",
      `<input class="card__input block mb-5" type="text" placeholder="Option ${optionNum}"  name="option" id="option${optionNum}" />`
    );
    askBtn.insertAdjacentHTML(
      "beforebegin",
      ` <input
    type="checkbox"
    id="optionCheck${optionNum}"
    class="card__checkbox mb-5"
    name="isCorrect"
  />`
    );
  };

  const askQuestionHandler = () => {
    if (questRef.current.value.trim() !== "") {
      console.log(questRef.current.value.trim());
      for (let i = 1; i < optionNum; i++) {
        const option = document.getElementById(`option${i}`);
        const checkBox = document.getElementById(`optionCheck${i}`);
        console.log(option.value, checkBox.checked);
      }
    } else {
      alert("Question field cannot be empty!");
    }
  };

  return (
    <div className="card">
      {/* <h2 className="card__question">Enter the questions and options?</h2>
      <textarea
        className="card__input-question"
        type="text"
        placeholder="Question"
        ref={questRef}
      />
      <div className="card__option-correct-display">
        <div>
          <h2 style={{ marginBottom: "5px" }}>Options</h2>
          <input
            className="card__input block mb-5"
            type="text"
            placeholder="Option 1"
            id="option1"
            name="option"
          />
          <button
            className="card__button block"
            onClick={addAnotherOptionHandler}
            id="addAnotherBtn"
          >
            Add Another Option
          </button>
        </div>

        <div>
          <h2 style={{ marginBottom: "5px" }}>Is Correct?</h2>
          <input
            type="checkbox"
            id="optionCheck1"
            className="card__checkbox mb-5"
            name="option1"
          />
          <button
            className="card__button block"
            id="askQuestBtn"
            onClick={askQuestionHandler}
          >
            Ask question
          </button>
        </div>
      </div> */}

      <h2>Polling Results</h2>

      {TEMP_DATA_POLL.options.map((option) => (
        <div className="card__poll-result" key={option}>
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

      <button className="card__button">Ask Another Question</button>
    </div>
  );
};

export default TeacherHomepage;
