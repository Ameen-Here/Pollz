import React, { useState } from "react";
import Homepage from "./homepage/Homepage";

import "./MainSection.css";
import Student from "./student/Student";
import TeacherHomepage from "./teacher/TeacherHomepage";

const MainSection = () => {
  const name = sessionStorage.getItem("name");
  const pageName =
    name === null ? "homepage" : name === "teacher" ? "teacher" : "student";
  const [currentPage, updateCurrentPage] = useState(pageName);
  const selectUserHandler = async function (val) {
    if (val === "student") {
      updateCurrentPage("student");
    } else {
      sessionStorage.setItem("name", "teacher");
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
