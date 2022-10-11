import React, { useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentHomepage = (props) => {
  const nameInp = useRef();
  const submitHandler = () => {
    const name = nameInp.current.value.trim().toLowerCase();
    if (name !== "" && name !== "teacher") {
      return props.currentPage("submitName", nameInp.current.value.trim());
    }
    toast.error("Name field can't be blank or 'teacher'", {
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
  return (
    <div className="card">
      <ToastContainer />
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
