const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");

//@desc     Get courses
//@route    Get /api/v1/courses
//@route    Get /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

//@desc     Get Single Course
//@route    Get /api/v1/courses/:id
//@access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(new ErrorResponse("No Course Found", 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc     Update Course
//@route    Put /api/v1/courses/:id
//@access   Private

exports.putCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorResponse("No Course Found", 404));
  }
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("You can not delete another course"), 401);
  }
  course = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: course });
});

//@desc     Create Course
//@route    POST /api/v1/courses
//@access   Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  var course = await Course.create(req.body);
  return res.status(200).json({ success: true, data: course });
});

//@desc     Create Course
//@route    POST /api/v1/courses
//@access   Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorResponse("No Course Found", 404));
  }
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("You can not delete another course"), 401);
  }

  await course.remove();

  return res.status(200).json({ success: true, data: {} });
});
