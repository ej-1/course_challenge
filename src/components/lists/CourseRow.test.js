import React from "react";
import CourseRow from "./CourseRow";
import renderer from "react-test-renderer";

const onSelect = jest.fn();

test("renders correctly", () => {
  const tree = renderer.create(<CourseRow onSelect={onSelect} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("onSelect sends slug", () => {
  const courseData = { slug: "/how-to-write-tests" };
  const slug = "/how-to-write-tests";
  const wrapper = mount(<CourseRow onSelect={onSelect} courseData={slug} />);
  wrapper.find("tr").simulate("click");

  expect(fetchSimulation).toHaveBeenCalledWith(slug);
});
