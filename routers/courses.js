const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  getCourses,
  createCourse,
  getCourse,
  putCourse,
  deleteCourse,
} = require("../controllers/courses");
const Course = require("../models/Course");
const advanceResults = require("../middleware/advanceResults");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advanceResults(Course, { path: "bootcamp", select: "name description" }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), putCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
