const express = require("express");
const app = express();
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.Email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/ca1d45ef64";
  const options = {
    method: "POST",
    auth: "chris:aaedf11b21bcfc1dd1bab8a7f9b50e8b-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.post("/success", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("server running in port 3000");
});

// api_key = "aaedf11b21bcfc1dd1bab8a7f9b50e8b-us21";
