import React, { useState } from "react";
import StudentHomepage from "./StudentHomepage";
import StudentPollingPage from "./StudentPollingPage";

const Student = () => {
  const [currentPage, setCurrentPage] = useState("selectNamePage");
  const currentPageHandler = (val) => {
    if (val === "submitName") {
      setCurrentPage("pollingPage");
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
