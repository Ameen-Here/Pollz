import React from "react";

const Homepage = () => {
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
          />
          <label for="student">Student</label>
        </li>
        <li>
          <input
            type="radio"
            id="teacher"
            name="radio-group"
            className="card__options"
          />
          <label for="teacher">Teacher</label>
        </li>
      </ul>
      <button className="card__button">Submit Answer</button>
    </div>
  );
};

export default Homepage;
