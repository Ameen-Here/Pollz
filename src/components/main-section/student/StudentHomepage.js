import React, { useRef } from "react";

const StudentHomepage = (props) => {
  const nameInp = useRef();
  const submitHandler = () => {
    const name = nameInp.current.value.trim().toLowerCase();
    if (name !== "" && name !== "teacher") {
      return props.currentPage("submitName", nameInp.current.value.trim());
    }
    alert("Name field can't be blank or 'teacher'");
  };
  return (
    <div className="card">
      <h2 className="card__question">Please enter your name?</h2>
      <input
        ref={nameInp}
        className="card__input"
        type="text"
        placeholder="Name"
      />
      <button className="card__button" onClick={submitHandler}>
        Submit Your Name
      </button>
    </div>
  );
};

export default StudentHomepage;
