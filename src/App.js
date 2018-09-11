import React, { Component } from "react";
import CoursesRoute from "./components/routes/CoursesRoute";
import "babel-polyfill";

class App extends Component {
  render() {
    return <div className="app">{<CoursesRoute />}</div>;
  }
}

export default App;
