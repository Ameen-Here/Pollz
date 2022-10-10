import React, { useRef } from "react";

const Homepage = (props) => {
  const studentChoice = useRef();
  const teacherChoice = useRef();
  const submitHandler = () => {
    if (studentChoice.current.checked) {
      return props.selectUser("student");
    }
    if (teacherChoice.current.checked) {
      return props.selectUser("teacher");
    }
    alert("Please select one option");
  };

  return (
    <div className="card">
      <h2 className="card__question">Select what type of user you are?</h2>
      <ul className="card__options">
        <li>
          <input
            type="radio"
            id="student"
            name="radio-group"
            className="card__options"
            ref={studentChoice}
          />
          <label htmlFor="student">Student</label>
        </li>
        <li>
          <input
            type="radio"
            id="teacher"
            name="radio-group"
            className="card__options"
            ref={teacherChoice}
          />
          <label htmlFor="teacher">Teacher</label>
        </li>
      </ul>
      <button className="card__button" onClick={submitHandler}>
        Submit Answer
      </button>
    </div>
  );
};

export default Homepage;
