import React from "react";
import CourseRow from "./CourseRow";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

const onSelect = jest.fn();
// dont put in global scope
const courseData = {
  title: "How to write tests",
  author: "Erik W. Jonsson",
  next_start_formatted: "Monday, September 17th, 2018"
};
const slug = "/how-to-write-tests";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <CourseRow onSelect={onSelect} courseData={courseData} slug={slug} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("onSelect sends slug", () => {
  const wrapper = shallow(
    <CourseRow onSelect={onSelect} courseData={courseData} slug={slug} />
  );
  wrapper.find("tr").simulate("click");

  expect(onSelect).toHaveBeenCalledWith("/how-to-write-tests");
});
