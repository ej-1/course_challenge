import React from "react";
import RowMapper from "./mappers";
import "../lists/CoursesTable.css";

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
