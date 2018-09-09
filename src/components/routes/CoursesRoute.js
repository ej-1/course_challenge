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
      totalCost: 0
    };
  }

  componentDidMount = () => {
    getCourses()
      .then(data => this.setState({ courses: data.courses })) // maybe not do data.
      .catch(error => console.log(error.message));
  };

  // rename later
  onSelect = slug => {
    //if (this.state.coursesDetails)
    getCourse(slug)
      .then(data => {
        this.setState({
          coursesDetails: [...this.state.coursesDetails, data],
          totalCost: this.calculateTotalCost([
            ...this.state.coursesDetails,
            data
          ])
        });
      })
      .catch(error => console.log(error.message));
  };

  // extract and make more generic.
  calculateTotalCost = coursesDetails => {
    let costs = coursesDetails.map(course => course.price.EU.total); // fix regional currrency later
    costs = costs.map(cost => parseInt(cost.split(/([0-9]+)/)[1])); // make this clearer.
    return costs.reduce((a, b) => a + b);
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
