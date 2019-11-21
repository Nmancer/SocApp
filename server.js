require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  rateLimit = require("express-rate-limit"),
  helmet = require("helmet"),
  path = require("path"),
  app = express(),
  passport = require("passport"),
  errorMiddleware = require("./middleware/error"),
  user = require("./routes/user"),
  profile = require("./routes/profile"),
  post = require("./routes/post"),
  comment = require("./routes/comment");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.enable("trust proxy");

app.use(express.static(path.join(__dirname, "client/build")));

app.use(limiter);
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo  Connected"))
  .catch(err => console.log(err));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/comments", comment);
app.use("/api/me", profile);

//production mode
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
//   //
//   app.get("*", (req, res) => {
//     res.sendfile(path.join((__dirname = "client/build/index.html")));
//   });
// }
// //build mode
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/public/index.html"));
// });
// app.use((error, req, res, next) => {
//   if (error.joi) {
//     return res.status(400).json({ error: error.joi.message });
//   }

//   return res.status(500).send(error);
// });
app.use(errorMiddleware);

app.listen(process.env.PORT, () => `Server started on ${process.env.PORT}`);
