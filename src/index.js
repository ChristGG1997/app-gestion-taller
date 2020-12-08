const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { urlencoded } = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const handlebars = require('handlebars');
const morgan = require('morgan');


const app = express();
require('./database');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        handlebars: handlebars
    })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

// Global variables


// Routes
app.use(require('./routes/index'));

// Static File
app.use(express.static(path.join(__dirname, 'public')));

// Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

// Trabajo elaborado por CHRISTIAN IGLESIAS, SEBASTIAN GUTIERREZ, ARLEX LIZARAZO