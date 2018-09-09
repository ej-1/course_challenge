import React, { Component } from "react";

import CoursesList from "../lists/courses-list";
import SumCounter from "../cart/sum-counter";
import { getCourses, getCourse } from "../../services/api";
import { Grid, Row, Col } from "react-bootstrap";

class SearchRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: "",
      coursesDetails: [],
      totalCost: 0,
      selectedCourses: [],
      currencySign: null
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
        const currencyFormat = this.currencyFormatter(data.price.EU.total);
        const amount = currencyFormat[0];
        const currencySign = currencyFormat[1];
        this.setState({
          coursesDetails: [...this.state.coursesDetails, data],
          totalCost: this.state.totalCost + amount,
          currencySign: currencySign
        });
      })
      .catch(error => console.log(error.message));
  };

  // extract to separate module
  currencyFormatter = currencyString => {
    const currencySign = currencyString.split(/([0-9]+)/)[0];
    const amount = parseInt(currencyString.split(/([0-9]+)/)[1]);
    return [amount, currencySign];
  };

  render() {
    return (
      <div className="courses-route">
        <Grid>
          {this.state.courses && (
            <Row>
              <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                <CoursesList
                  courses={this.state.courses}
                  onSelect={this.onSelect}
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12} mdOffset={2} md={3} lgOffset={2} lg={3}>
              <SumCounter
                sum={this.state.totalCost}
                currencySign={this.state.currencySign}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SearchRoute;
