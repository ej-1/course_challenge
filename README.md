#### Instructions

- To run the app:

- `npm install`
- `npm start`

#### What to improve:

- Didn't get around to testing due to time constrain, perhaps we could talk about it. Having functional components makes the testing easier though.
- I deviated a bit from the requirements. So API request to fetch course details is everytime a user selects a course, but is all course details are fetched when the app loads. This is a better solution and makes the site more responsive, since you don't have to wait for the API request to complete to add to the cost to the cart/counter.
- Have to write proptypes.
- can make CoursesTable even more agnostic and call it just table. Then send in mapped rows and headers.
- errors gets printed to console. Coudld be logged or caught by some devops tool.

- extract currencyFormatter to separate module.
- look into using some currency formatting library.
- Unselecting courses does not work, but was not specified in instructions. Todo for the future.
- A potential issue: a bug was the sometimes it seemed like the details for a course had not been fetched yet when clicking on a course, so getting the cost led to a crash. I fixed this by making sure to check that the course details had in fact been fetched. Hopefully this bug is now gone.

- Suggestion: If there were many courses then getting details for each course results in a lot of requests. Ideally the API would provide a way to use one request to fetch multiple courses.
