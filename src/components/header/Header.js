import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__heading">Pollz</h1>
      <p className="header__subtext">
        Create and participate a live online poll.
      </p>
    </div>
  );
};

export default Header;
