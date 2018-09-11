#### Instructions

- To run the app:

- `npm install`
- `npm start`

#### What to improve:

- I deviated a bit from the requirements. The instructions specified an API request to fetch course details everytime a user selects a course, but instead I implemented so all course details are fetched when the app loads. This is a better solution and makes the site more responsive, since you don't have to wait for the API request to complete after clicking on a course and then wait for the costs to appear in the cart/SumCounter.
- Have to write proptypes.
- can make CoursesTable even more agnostic and call it just table. Then send in mapped rows and headers.
- errors gets printed to console. Couldl be logged or caught by some DevOps tool.

- extract currencyFormatter to separate module.
- look into using some currency formatting library.
- Unselecting courses does not work, but was not specified in instructions. Todo for the future.
- A potential issue: a bug was the sometimes it seemed like the details for a course had not been fetched yet when clicking on a course, so getting the cost led to a crash. I fixed this by making sure to check that the course details had in fact been fetched. Hopefully this bug is now gone.

- Suggestion: If there were many courses, then getting details for each course results in a lot of requests. Ideally the API would provide a way to use one request to fetch multiple courses.

#### Testing

- I would focus on unit testing foremost. Since, most tests are dumb (functional components) they are pretty easy to test. I already did this for the CourseRow component. Along with a snapshot test.

- API calls used in CoursesRoutes can be mocked and tested separately. getIPInfo(), getCourses(), getCourses() comes from separate modules so that is easy.
- getCoursesDetails(), currencyFormatter(), highlight() can be tested from CoursesRoutes, but I would extract them into separate modules for unit testing. Would make it easier to test and make less clutter in CoursesRoutes.
- onSelect() I would probably split up further so the cost calculation logic and setting the state is handled in a separate function. There should be more focus on single-responsibility than there is right now.
- A integration test would be good to see in general, especially if this feature is something that could collide with other logic.
- In a integration tests I would focus on testing that when clicking on a CourseRow state is lifted up to CoursesRoute all the way from CourseRow and then calls the highlight() function and the function for calculating cost which I would extract things into.
- If I decide against the integration test it would be if there is a lack of time and unit testing and manually testing the feature is good enought. Given also that it is a pretty standalone feature that does not collide or depend to much on other logic in a bigger app.

##### Other things to test, but that would be more expensive.

- That state with courses and courseDetails are set in CoursesRoute. Test that when API calls are made and other such functions that setState works.

#### CSS

- Should add a bit of padding to the right side of CourseRow.
