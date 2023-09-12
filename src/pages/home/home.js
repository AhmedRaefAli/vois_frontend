import React, { Component } from "react";
import "./styles.css";
import voisLogo from "../../resources/_VOIS.jpeg";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${voisLogo})` }}
        ></div>
        <div className="content">
          <h1 className="welcome-text">Welcome to _Vois Website!</h1>
          <p className="description">
            Explore our amazing manage your tasks and update status.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;