import React, { useState } from "react";
import Homepage from "./homepage/Homepage";

import "./MainSection.css";
import Student from "./student/Student";
import TeacherHomepage from "./teacher/TeacherHomepage";

const MainSection = () => {
  const [currentPage, updateCurrentPage] = useState("homepage");
  const selectUserHandler = async function (val) {
    console.log(val);
    const res = await fetch("/connected");
    console.log(res);
    const resJson = await res.json();
    console.log(resJson);
    if (val === "student") {
      updateCurrentPage("student");
    } else {
      updateCurrentPage("teacher");
    }
  };
  return (
    <main className="main">
      {currentPage === "homepage" && (
        <Homepage selectUser={selectUserHandler} />
      )}
      {currentPage === "student" && <Student />}
      {currentPage === "teacher" && <TeacherHomepage />}
    </main>
  );
};

export default MainSection;
