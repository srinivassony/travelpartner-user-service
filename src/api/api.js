const express = require('express');
const cors = require('cors');
let app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require("body-parser");

let userService = require('../service/user');

//middelwares
app.use(flash());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));
app.set('views', path.join(__dirname, '../../views'))
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../../views')));
app.use(cors());
app.use(session({
    key:'session',
    secret: 'session_cookie_secret',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 6000000}
}));

app.get('/', async (req, res) =>
{
	let message = req.flash('error');

	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pagesInfo/signin', {
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get('/register', async (req, res) =>
{
	let message = req.flash('error');

	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pagesInfo/signup', {
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get('/login',  (req, res) =>
{
	let message = req.flash('error');

	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pagesInfo/signin',{
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get('/active-account',  (req, res) =>
{
	let message = req.flash('error');

	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	let message1 = req.flash('success');

	if (message1.length > 0)
	{
		message1 = message1[0];
	} 
	else
	{
		message1 = null;
	}

	res.render('pagesInfo/active-account', {
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get('/dashboard',  (req, res) =>
{
	var name = req.session.name;
	var id = req.session.id;
	var uuid = req.session.uuid;
	var countInfo = req.session.count;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	res.render('pagesInfo/dashboard', {
		isAuthenticated: req.session.isLoggedIn,
		username: name,
		id: id,
		uuid: uuid,
		countInfo: countInfo
	});
});

app.get('/logout', async function (req, res)
{
	req.session.destroy(function (err)
	{
		if (err)
		{
			req.flash('error', err);

            res.redirect('/error-login');
		} 
		else
		{
			res.redirect('/')
		}
	});
});

app.post('/api/add/user', userService.createUser);

app.post('/api/login/user', userService.userLogin);

app.post('/api/resend/invite/user', userService.reSendInviteUser);

app.get('/api/update/invite/user/:id', userService.InviteUser);


module.exports = app;