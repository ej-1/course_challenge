import React, { Component } from "react";

import CoursesList from "../lists/courses-list";
import { getCourses, getCourse } from "../../services/api";

class SearchRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: "" };
  }

  componentDidMount = () => {
    getCourses()
      .then(data => this.setState({ courses: data.courses })) // maybe not do data.
      .catch(error => console.log(error.message));
  };

  // rename later
  onSelect = id => {
    getCourse(id)
      .then(data => this.setState({ course: data }))
      .catch(error => console.log(error.message));
  };

  render() {
    return (
      <div className="courses-route">
        {this.state.courses && <CoursesList courses={this.state.courses} />}
      </div>
    );
  }
}

export default SearchRoute;
