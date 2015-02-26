var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    errorHandler = require("errorhandler"),
    methodOverride = require("method-override"),
    swig = require('swig'),
    hostname = process.env.HOSTNAME || "0.0.0.0",
    port = parseInt(process.env.PORT, 10) || 80,
    debug = !!process.env.DEBUG,
    mongoose = require('mongoose');


mongoose.connect(process.env.MONGOLAB_URI);

var LogInstance = mongoose.model('Log', mongoose.Schema({
    application: String,
    message: String,
    trace: String
}));

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', !debug);
swig.setDefaults({ cache: false });

app.get("/", function (req, res) {
    res.render("index");
});


app.get("/", function (req, res) {
    res.render("index");
});

app.get("/index.html", function (req, res) {
    res.render("index");
});

app.get("/projects/hal", function (req, res) {
    res.render("projects/hal/index");
});

app.post('/api/log', function (req, res) {
    var data = {
        application: req.headers.application,
        message: req.headers.message,
        trace: req.headers.trace
    };
    var log = new LogInstance(data);
    log.save(function(err) {
        if (err) {
            console.log("Error: " + err);
        }
    });
    res.send("");
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/static"));
app.use(errorHandler({
    dumpExceptions: debug,
    showStack: debug
}));

console.log("Server is listening at port " + port);
app.listen(port, hostname);
