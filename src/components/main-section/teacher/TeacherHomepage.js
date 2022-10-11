import React, { useRef, useState, useEffect } from "react";

import socket from "../../../socketConfig";

const TeacherHomepage = () => {
  const [optionNum, setOptionNum] = useState(2);
  const questRef = useRef();

  socket.emit("started");
  useEffect(() => {
    socket.on("getPoll", (polls) => {
      setDataPoll(polls);
    });
  }, [socket]);

  const [queuOption, setQueeOption] = useState(null);
  const [dataPoll, setDataPoll] = useState(null);

  const [btnWait, setBtnWait] = useState("Waiting for students to answer");

  const [addQuestBtn, setAddQuestBtn] = useState(true);
  useEffect(() => {
    socket.on("queeCompleted", (value) => {
      if (value) {
        setAddQuestBtn(true);
      } else {
        setAddQuestBtn(false);
      }
    });
    socket.on("voteCompleted", (value) => {
      if (value) {
        setBtnWait("Add Question");
      }
    });
  }, [socket]);

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

  const nextQstnHandler = () => {
    setOptionNum(2);
    setDataPoll(null);
    setQueeOption(null);
  };

  const askQuestionHandler = () => {
    const question = questRef.current.value.trim();
    const options = [];
    setQueeOption(true);
    if (question !== "") {
      console.log(optionNum);
      for (let i = 1; i < optionNum; i++) {
        const option = document.getElementById(`option${i}`);
        console.log(option.value);
        const checkBox = document.getElementById(`optionCheck${i}`);
        options.push(option.value);

        // Create questionOption obj to emit

        // Create options to emit
        const answers = {};
        const percentage = {};
        for (let i = 0; i < options.length; i++) {
          answers[options[i]] = 0;
          percentage[options[i]] = 0;
        }

        console.log(answers, percentage);

        socket.emit(
          "updateQuestionsAndOption",
          { question, options },
          {
            options,
            answers,
            totalAnswers: 0,
            percentage,
            totalVote: 0,
            nextQuestionQuee: 0,
          }
        );
      }
    } else {
      alert("Question field cannot be empty!");
    }
  };

  console.log(dataPoll);
  return (
    <div className="card">
      {!queuOption && (
        <>
          <h2 className="card__question">Enter the questions and options?</h2>
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
                className={
                  addQuestBtn ? "card__button" : "card__button disableBtn"
                }
                id="askQuestBtn"
                onClick={askQuestionHandler}
              >
                Ask question
              </button>
            </div>
          </div>
        </>
      )}
      {/*  */}

      {dataPoll && queuOption && (
        <>
          <h2>Polling Results</h2>
          {dataPoll.options.map((option) => (
            <div className="card__poll-result" key={option}>
              {option}
              <span
                className="percentage-bar"
                style={{
                  width: `${dataPoll.percentage[option]}%`,
                }}
              ></span>
              <span className="percentage-value">
                {(
                  (dataPoll.answers[option] / dataPoll.totalAnswers) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          ))}

          <button
            className={
              btnWait === "Add Question"
                ? "card__button"
                : "card__button disableBtn"
            }
            onClick={nextQstnHandler}
          >
            {btnWait}
          </button>
        </>
      )}
    </div>
  );
};

export default TeacherHomepage;
