const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

const app = express();

/* MongoDB service */
mongoose
  .connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is connected!");
  });

/* MongoDB Model*/
require("./modles/User");
/* Passport service */
require("./services/passport");

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    // Cookie Options
    maxAge: 3 * 24 * 60 * 60 * 1000 // 3 * 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* Express routes */
require("./routes/authRoutes")(app);

/* App is listening to PORT */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening PORT: ${PORT}`);
});
