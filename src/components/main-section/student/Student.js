import React, { useState } from "react";
import StudentHomepage from "./StudentHomepage";
import StudentPollingPage from "./StudentPollingPage";

const Student = () => {
  const pageName =
    sessionStorage.getItem("name") === null ? "selectNamePage" : "pollingPage";
  const [currentPage, setCurrentPage] = useState(pageName);
  const currentPageHandler = (val, name) => {
    if (val === "submitName") {
      setCurrentPage("pollingPage");
      sessionStorage.setItem("name", name);
    }
  };
  return (
    <>
      {currentPage === "selectNamePage" && (
        <StudentHomepage currentPage={currentPageHandler} />
      )}
      {currentPage === "pollingPage" && <StudentPollingPage />}
    </>
  );
};

export default Student;
