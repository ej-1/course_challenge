import React from "react";
import CourseRow from "./course-row";

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

export default RowMapper;
