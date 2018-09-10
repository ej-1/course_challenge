import React, { Component } from "react";
import CourseRow from "./course-row";
import PropTypes from "prop-types";
import "../lists/courses-table.css";

const RowMapper = (courses, onSelect) => {
  const coursesRows = [];
  for (var course in courses) {
    let courseData = courses[course];
    coursesRows.push(
      <CourseRow courseData={courseData} slug={course} onSelect={onSelect} />
    );
  }
  return coursesRows;
};

const CoursesTable = ({ courses, onSelect }) => (
  <table className="courses-table">
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Next Start Date</th>
    </tr>
    {RowMapper(courses, onSelect)}
  </table>
);

export default CoursesTable;

CoursesTable.propTypes = {
  courses: PropTypes.array
};
