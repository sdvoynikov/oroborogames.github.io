var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    errorHandler = require("errorhandler"),
    methodOverride = require("method-override"),
    swig = require('swig'),
    hostname = process.env.HOSTNAME || "localhost",
    port = parseInt(process.env.PORT, 10) || 8000,
    debug = !!process.env.DEBUG;

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

console.log("Server is listening at " + hostname + ":" + port);
app.listen(port, hostname);
