import React, { Component } from "react";
import CourseRow from "../lists/course-row";
import PropTypes from "prop-types";
import "../lists/courses-list.css";

// USE FUNCTIONAL COMPONENT INSTEAD
class coursesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: []
    };
  }

  render() {
    // AM I SENDING IN TO MUCH DATA?
    const courses = this.props.courses;
    const coursesRows = [];
    for (var course in this.props.courses) {
      let courseData = courses[course];
      coursesRows.push(
        <CourseRow
          courseData={courseData}
          slug={course}
          onSelect={this.props.onSelect}
        />
      );
    }
    // COULD EXTRACT TABLE INTO SEPARATE COMPONENT!!
    return (
      <table className="courses-table">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Next Start Date</th>
        </tr>
        {coursesRows}
      </table>
    );
  }
}

export default coursesList;

coursesList.propTypes = {
  courses: PropTypes.array
};
