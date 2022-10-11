import React, { useRef, useState, useEffect } from "react";

import socket from "../../../socketConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherHomepage = () => {
  const [optionNum, setOptionNum] = useState(2);
  const questRef = useRef();

  useEffect(() => {
    socket.emit("started");
  }, []);

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
        setQueeOption(true);
      }
    });
    socket.on("voteCompleted", (value) => {
      if (value) {
        setBtnWait("Add Question");
      } else {
        setBtnWait("Waiting for students to answer");
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

  const toastErrorDisplayer = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const askQuestionHandler = () => {
    const question = questRef.current.value.trim();
    const options = [];
    let isChecked = false;
    setBtnWait("Waiting for students to answer");

    if (question !== "") {
      for (let i = 1; i < optionNum; i++) {
        const option = document.getElementById(`option${i}`);
        const checkBox = document.getElementById(`optionCheck${i}`);
        if (checkBox.checked) {
          isChecked = true;
        }
        if (option.value.trim() === "") {
          return toastErrorDisplayer("Options can't be empty.");
        }
        options.push(option.value);
      }
      if (!isChecked) {
        return toastErrorDisplayer(
          "There should be atleast one correct option."
        );
      }
      setQueeOption(true);
      // Create options to emit
      const answers = {};
      const percentage = {};
      for (let i = 0; i < options.length; i++) {
        answers[options[i]] = 0;
        percentage[options[i]] = 0;
      }

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
    } else {
      return toastErrorDisplayer("Question field cannot be empty!");
    }
  };
  console.log(dataPoll);
  return (
    <div className="card">
      <ToastContainer />
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
                className="card__input block mb-5 card-options-check"
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
                // className={
                //   addQuestBtn ? "card__button" : "card__button disableBtn"
                // }
                className="card__button"
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
                {dataPoll.answers[option]} (
                {dataPoll.answers[option] === 0
                  ? 0
                  : (
                      (dataPoll.answers[option] / dataPoll.totalAnswers) *
                      100
                    ).toFixed(1)}
                %)
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
