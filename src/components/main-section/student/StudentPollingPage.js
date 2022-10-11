import React, { useState, useEffect } from "react";

import "./StudentPollingPage.css";

import socket from "../../../socketConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentPollingPage = () => {
  useEffect(() => {
    socket.emit("started");
  }, []);

  useEffect(() => {
    socket.on("getPoll", (polls) => {
      setDataPoll(polls);
    });
    socket.on("updateQuestion", (question) => {
      setQuestionOption(question);
    });
  }, [socket]);

  const [btnWait, setBtnWait] = useState("Waiting for teacher to ask question");
  useEffect(() => {
    socket.on("voteCompleted", (value) => {
      if (value) {
        setBtnWait("Next Question");
      }
    });
  }, []);

  let answer = sessionStorage.getItem("answer") === null ? false : true;
  const [isAnswered, setIsAnswered] = useState(answer);
  const [dataPoll, setDataPoll] = useState(null);

  const [questionOption, setQuestionOption] = useState(null);

  const optionSubmitHandler = () => {
    for (let i = 0; i < questionOption.options.length; i++) {
      if (document.getElementById(questionOption.options[i]).checked) {
        sessionStorage.setItem("answer", questionOption.options[i]);
        setIsAnswered(true);

        socket.emit("updatePoll", questionOption.options[i]);
      }
    }
  };

  const nextQstnHandler = () => {
    sessionStorage.setItem("answer", null);
    setIsAnswered(false);
    socket.emit("queeNext");
  };

  const timer = () => {
    {
      toast.info("Answer within 60 seconds", {
        position: "top-right",
        autoClose: 60000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        setIsAnswered(true);
        socket.emit("updatePoll", null);
      }, 60000);
    }
  };
  return (
    <div className="card">
      <ToastContainer />
      {!questionOption && !isAnswered && (
        <h3>
          Waiting for teacher to ask question or students to finish previous
          one...
        </h3>
      )}
      {questionOption && !isAnswered && (
        <>
          {/* */}
          {timer()}
          <h2 className="card__question">{questionOption.question}</h2>
          <ul className="card__options">
            {questionOption.options.map((option) => (
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
          <button className="card__button" onClick={optionSubmitHandler}>
            Submit Answer
          </button>
        </>
      )}

      {dataPoll && isAnswered && (
        <>
          <h2>Polling Results</h2>

          {dataPoll.options.map((option) => (
            <div className="card__poll-result">
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
              btnWait === "Next Question"
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

export default StudentPollingPage;
