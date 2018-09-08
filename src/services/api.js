import fetch from "cross-fetch";
import {
  GET_COURSES_ENDPOINT,
  GET_COURSE_ENDPOINT
} from "../services/api-endpoints";

const REQUEST_CONFIG = requestType => ({
  method: requestType,
  mode: "cors",
  cache: "default", // It is caching.
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  redirect: "follow",
  referrer: "no-referrer"
});

async function getCourses() {
  const endpoint = GET_COURSES_ENDPOINT;
  let response = await fetch(endpoint, REQUEST_CONFIG("GET"));
  return response.json();
}

async function getCourse(slug) {
  const course = `/${slug}`;
  const endpoint = GET_COURSE_ENDPOINT + course;
  let response = await fetch(endpoint, REQUEST_CONFIG("GET"));
  return response.json();
}

export { getCourses, getCourse };
