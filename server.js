const express = require("express");
const dotenv = require("dotenv");
const bootcamp = require("./routers/bootcamps");
const courses = require("./routers/courses");
const auth = require("./routers/auth");
const users = require("./routers/users");
const reviews = require("./routers/reviews");
const morgon = require("morgan");
const connectDatabse = require("./config/db");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//Load Env vars
dotenv.config({ path: "./config/config.env" });
connectDatabse();
const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}

//File
app.use(fileUpload());

//Sanitaze data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

// Prevent XSS atacks
app.use(xss());

//rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100,
});

app.use(limiter);

// prevent http param  pollution
app.use(hpp());

// Enable Cors
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/bootcamps", bootcamp);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} !`);
});
