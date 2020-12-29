// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/timestamp/:date", function(req, res) {
    let input = req.params.date;
    if (input.indexOf('-') == -1) {
        input = parseInt(input);
    }
    if (!input) {
        input = 14400000
    }

    let date = new Date(input);

    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date.getTime())) { // d.valueOf() could also work
            // date is not valid
            return res.json({
                error: 'Invalid Date'

            });
        } else {

        }
    } else {
        return res.json({
            error: 'not a Date'

        });
    }
    var timestamp = Date.parse(input);

    // let date = new Date(input);


    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    date = new Date(now_utc)

    let day = date.getDate()
    if (day < 10) {
        day = '0' + day
    }
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
    var monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][date.getMonth()];
    let dateString = weekday + ', ' + day + ', ' + monthShortName + ' ' + date.getFullYear() + ' ' + date.toLocaleTimeString('en-US', { hour12: false }) + ' GMT'

    res.json({
        unix: date.valueOf(),
        utc: dateString

    });
});
app.get("/api/timestamp", function(req, res) {

    let date = new Date(14400000);
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    date = new Date(now_utc)

    let day = date.getDate()
    if (day < 10) {
        day = '0' + day
    }
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
    var monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][date.getMonth()];
    let dateString = weekday + ', ' + day + ', ' + monthShortName + ' ' + date.getFullYear() + ' ' + date.toLocaleTimeString('en-US', { hour12: false }) + ' GMT'

    res.json({
        unix: date.valueOf(),
        utc: dateString

    });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
