import React, { Component } from "react";
import "../lists/course-row.css";

// USE FUNCTIONAL COMPONENT INSTEAD
class CourseRow extends Component {
  render() {
    const courseData = this.props.courseData;
    return (
      <tr
        key={courseData.title}
        id={courseData.title}
        onClick={() => this.props.onSelect(courseData.title)}
      >
        <td>{courseData.url}</td>
        <td>{courseData.title}</td>
        <td>{courseData.author}</td>
        <td>{courseData.next_start_formatted}</td>
      </tr>
    );
  }
}

export default CourseRow;
