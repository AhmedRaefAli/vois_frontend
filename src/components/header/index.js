import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <header className="header">
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
