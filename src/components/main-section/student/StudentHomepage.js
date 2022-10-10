import React from "react";

const StudentHomepage = () => {
  const submitHandler = () => {};
  return (
    <div className="card">
      <h2 className="card__question">Please enter your name?</h2>
      <input className="card__input" type="text" placeholder="Name" />
      <button className="card__button" onClick={submitHandler}>
        Submit Your Name
      </button>
    </div>
  );
};

export default StudentHomepage;
