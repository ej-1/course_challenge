import React from "react";
import "../lists/course-row.css";

const CourseRow = ({ courseData, slug, onSelect }) => (
  <tr key={courseData.title} id={slug} onClick={() => onSelect(slug)}>
    <td>{courseData.title}</td>
    <td>{courseData.author}</td>
    <td>{courseData.next_start_formatted}</td>
  </tr>
);

export default CourseRow;
