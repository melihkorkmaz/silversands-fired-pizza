var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets')))


app.get('/', (req, res) =>{
    res.render('index');
});

var port = process.env.PORT || 8080;
app.listen(port, () => { console.log('web-site has been started at 8080')});