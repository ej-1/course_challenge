import React, { Component } from "react";
import fetch from "cross-fetch";
import CoursesTable from "../lists/courses-table";
import SumCounter from "../cart/sum-counter";
import { getCourses, getCourse } from "../../services/api";
import { handleCountryCode, getIPInfo } from "../../helpers/region-helper";
import { Grid, Row, Col } from "react-bootstrap";

class SearchRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
      coursesDetails: [],
      totalCost: 0,
      selectedCourses: [],
      currencySign: null,
      userContinentCode: null
    };
  }

  async componentDidMount() {
    getCourses()
      .then(data => {
        this.setState({ courses: data.courses });
        // get course details immediately after setting courses.
        const slugs = Object.keys(data.courses);
        this.getCoursesDetails(slugs);
      })
      .catch(error => console.log(error));

    getIPInfo()
      .then(IPInfo =>
        this.setState({
          userContinentCode: handleCountryCode(
            IPInfo.country,
            IPInfo.continent_code
          )
        })
      )
      .catch(error => console.log(error));
  }

  getCoursesDetails = async slugs => {
    const courseRequests = slugs.map(slug => getCourse(slug));
    const courseDetails = await Promise.all(courseRequests);
    this.setState({ coursesDetails: courseDetails });
  };

  highlight = slug => {
    const element = document.getElementById(slug);
    element.className = "selected";
  };

  // rename later
  onSelect = slug => {
    if (!this.state.selectedCourses.includes(slug)) {
      this.highlight(slug);
      const selectedCourse = this.state.coursesDetails.find(
        course => course.slug === slug
      )[0];
      const cost = selectedCourse.price[this.state.userContinentCode].total;
      const currencyFormat = this.currencyFormatter(cost);
      const amount = currencyFormat[0];
      const currencySign = currencyFormat[1];

      this.setState({
        totalCost: this.state.totalCost + amount,
        currencySign: currencySign,
        selectedCourses: [slug, ...this.state.selectedCourses]
      });
    }
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
        {this.state.courses && (
          <Grid>
            <Row>
              <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                <CoursesTable
                  courses={this.state.courses}
                  onSelect={this.onSelect}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} mdOffset={2} md={3} lgOffset={2} lg={3}>
                <SumCounter
                  sum={this.state.totalCost}
                  currencySign={this.state.currencySign}
                />
              </Col>
            </Row>
          </Grid>
        )}
      </div>
    );
  }
}

export default SearchRoute;
