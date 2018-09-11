import React, { Component } from "react";
import CoursesTable from "../lists/CoursesTable";
import SumCounter from "../cart/SumCounter";
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

  componentDidMount() {
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
    const courseRequests = slugs.map(getCourse);
    const courseDetails = await Promise.all(courseRequests);
    this.setState({ coursesDetails: courseDetails });
  };

  // Direct DOM manipulation. Might be refactored later.
  // Also, maybe not hardcode className, but send it in instead.
  highlight = slug => {
    const element = document.getElementById(slug);
    element.className = "selected";
  };

  onSelect = slug => {
    const selectedCourse = this.state.coursesDetails.find(
      course => course.slug === slug
    );
    // If a course has not been selected before. This is to prevent doing things again
    // and adding costs again.
    // Also check that the details for the selected course has been fetched.
    if (!this.state.selectedCourses.includes(slug) && selectedCourse) {
      this.highlight(slug);

      const cost = selectedCourse.price[this.state.userContinentCode].total;
      const { amount, currencySign } = this.currencyFormatter(cost);

      this.setState({
        totalCost: this.state.totalCost + amount,
        currencySign: currencySign,
        selectedCourses: [slug, ...this.state.selectedCourses]
      });
    }
  };

  // TODO: extract to separate module later.
  currencyFormatter = currencyString => {
    const currencySign = currencyString.split(/([0-9]+)/)[0];
    const amount = parseInt(currencyString.split(/([0-9]+)/)[1]);
    return { amount, currencySign };
  };

  render() {
    return (
      <div>
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
