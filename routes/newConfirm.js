const express = require("express");
var router = express.Router();
var cors = require("cors");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// router.post("/confirm", (req, res) => {
//   console.log(req.body);
// });

/* GET home page. */
router.options("/confirm", cors());
router.post("/confirm", function (req, res, next) {
  let data = req.body;
  const msg = {
    to: data.email,
    from: "vanessa@vanesthedev.com",
    subject: "Request Time Off attempt 6/5 at 921 pm",
    text: data.timeOff,
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  //ES6
  sgMail
    .send(msg)
    .then(res.send("this worked"))
    .then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
});

module.exports = router;
