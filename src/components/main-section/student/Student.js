import React, { useState } from "react";
import StudentHomepage from "./StudentHomepage";
import StudentPollingPage from "./StudentPollingPage";

import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3001");

const Student = () => {
  const pageName =
    sessionStorage.getItem("name") === null ? "selectNamePage" : "pollingPage";
  const [currentPage, setCurrentPage] = useState(pageName);
  const currentPageHandler = (val, name) => {
    if (val === "submitName") {
      console.log(val);

      setCurrentPage("pollingPage");
      sessionStorage.setItem("name", name);
      socket.on("update", (candidates) => {
        console.log(candidates);
      });
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
