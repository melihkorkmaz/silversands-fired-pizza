var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets')))


app.get('/', (req, res) => {
    res.render('index');
});


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_USER_PASS
    }
});

app.post('/contact-form', (req, res) => {
    var mailOptions = {
        from: process.env.MAIL_USER,
        to: 'melih@tdsmaker.com',
        subject: 'Fired Pizza Contact Form',
        html: `<div><b>Name:</b> ${req.body.firstName} ${req.body.lastName}</div>`
        + `<div><b>Email:</b> ${req.body.email}</div>`
        + `<div><b>Phone:</b> ${req.body.phone}</div>`
        + `<div><b>Message:</b> ${req.body.message}</div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send({status : false, message : error.message});
        } else {
            res.send({status : true, message : "We've got your e-mail. Thank you!"});
        }
    });
})

var port = process.env.PORT || 8080;
app.listen(port, () => { console.log('web-site has been started at 8080') });