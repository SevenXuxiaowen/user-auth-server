const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ data: "Hello World!" });
  });
  
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // Successful authentication
      res.send({ test: "user auth success!" });
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send({ test: "user is logout" });
  });
};
