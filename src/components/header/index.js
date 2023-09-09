import React from "react";
import { Link } from "react-router-dom";
import voisLogo from "../../resources/_VOIS.jpeg";
import "./style.css";

const Header = () => {
  return (
    <header className="header">
      {/* <div className="header__logo">
        <img src={voisLogo} alt="Vodafone Logo" />
      </div> */}
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-tasks">My Tasks</Link>
          </li>
        </ul>
      </nav>
      <div className="header__actions">
        <button className="header__create-task-btn">
          <Link to="/create-task"> Create Task</Link>
        </button>
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
