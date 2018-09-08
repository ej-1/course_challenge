import React, { Component } from "react";
import PropTypes from "prop-types";
import "../lists/courses-list.css";

// USE FUNCTIONAL COMPONENT INSTEAD
class coursesList extends Component {
  render() {
    // AM I SENDING IN TO MUCH DATA?
    const courses = this.props.courses;
    const coursesRows = [];
    for (var course in this.props.courses) {
      let courseData = courses[course];
      coursesRows.push(
        <tr key={courseData.title}>
          <td>{courseData.url}</td>
          <td>{courseData.title}</td>
          <td>{courseData.author}</td>
          <td>{courseData.next_start_formatted}</td>
          {/* LINK COULD BE EXTRACTED INTO SEPARATE COMPONENT. ALSO HARDCODING google.com may not be good. could be extracted. */}
        </tr>
      );
    }
    {
      console.log("INSIDE LIST", coursesRows);
    }
    // COULD EXTRACT TABLE INTO SEPARATE COMPONENT!!
    return <table className="courses-table">{coursesRows}</table>;
  }
}

export default coursesList;

coursesList.propTypes = {
  courses: PropTypes.array
};
