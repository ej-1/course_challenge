import React from "react";
import CourseRow from "./course-row";

const RowMapper = (courses, onSelect) => {
  const coursesRows = [];
  for (var slug in courses) {
    let courseData = courses[slug];
    coursesRows.push(
      <CourseRow courseData={courseData} slug={slug} onSelect={onSelect} />
    );
  }
  return coursesRows;
};

export default RowMapper;
