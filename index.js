const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const { response } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }

            }

        ]
    }

    const url = 'https://us21.api.mailchimp.com/3.0/lists/18747ff83e';
    const options = {
        method: "POST",
        auth: "Anish_vish:a7ece9044ad522afa1603678a0bb7084-us21"

    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/faliure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })

    })
    const jsondata = JSON.stringify(data);
    request.write(jsondata); //server bhi is data ko use kars kae isliye stringify kiya gya ha..
    request.end();
    app.post("/failure", function(req, res) {
        res.redirect("/");
    });
});

app.listen(8001, function() {
    console.log("server is running..");
});







//api a7ece9044ad522afa1603678a0bb7084-us21

// 18747ff83e