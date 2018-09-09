import React, { Component } from "react";
import "../lists/course-row.css";

// USE FUNCTIONAL COMPONENT INSTEAD
class CourseRow extends Component {
  render() {
    const courseData = this.props.courseData;
    const slug = this.props.slug;
    return (
      <tr
        key={courseData.title}
        id={slug}
        onClick={() => this.props.onSelect(slug)}
      >
        <td>{courseData.title}</td>
        <td>{courseData.author}</td>
        <td>{courseData.next_start_formatted}</td>
      </tr>
    );
  }
}

export default CourseRow;
