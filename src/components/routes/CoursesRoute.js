import React, { Component } from "react";

import CoursesList from "../lists/courses-list";
import SumCounter from "../cart/sum-counter";
import { getCourses, getCourse } from "../../services/api";

class SearchRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: "",
      coursesDetails: [],
      totalCost: 0,
      selectedCourses: []
    };
  }

  componentDidMount = () => {
    getCourses()
      .then(data => this.setState({ courses: data.courses })) // maybe not do data.
      .catch(error => console.log(error.message));
  };

  highlight = slug => {
    const element = document.getElementById(slug);
    element.className = "selected";
  };

  // rename later
  onSelect = url => {
    this.highlight(url); // hightlight selected element.
    this.setState({ selectedCourses: [...this.state.selectedCourses, url] });

    //if (this.state.coursesDetails)
    // this.coursesDetails.filter(course => course.url === url);
    getCourse(url)
      .then(data => {
        this.setState({
          coursesDetails: [...this.state.coursesDetails, data],
          totalCost: this.calculateTotalCost(data, this.state.totalCost)
        });
      })
      .catch(error => console.log(error.message));
  };

  // extract and make more generic.
  calculateTotalCost = (course, previousTotalCost) => {
    let cost = course.price.EU.total; // fix regional currrency later
    cost = parseInt(cost.split(/([0-9]+)/)[1]); // make this clearer.
    return previousTotalCost + cost;
  };

  render() {
    return (
      <div className="courses-route">
        {this.state.courses && (
          <CoursesList courses={this.state.courses} onSelect={this.onSelect} />
        )}
        <SumCounter sum={this.state.totalCost} />
      </div>
    );
  }
}

export default SearchRoute;
