const config = require('../../config');
const express = require('express');
const cors = require('cors');
let app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require("body-parser");
const multer = require('multer');

let userService = require('../service/user');
let imageService = require('../service/image');
let galleryService = require('../service/gallery');
let userDb = require('../database/db/user');
let followUsersService = require('../service/follow-users');
let postService = require('../service/post');
let postImageService = require('../service/postImages');
let postLikeService = require('../service/postLike');
let postCommentService = require('../service/postComment');


//middelwares
app.use(flash());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));
app.set('views', path.join(__dirname, '../../views'))
app.set('uploads', path.join(__dirname, '../../uploads'))
app.set('gallery', path.join(__dirname, '../gallery'))
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

	let message1 = req.flash('success');

	if (message1.length > 0)
	{
		message1 = message1[0];
	} 
	else
	{
		message1 = null;
	}

	res.render('pagesInfo/signin', {
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
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

	let message1 = req.flash('success');

	if (message1.length > 0)
	{
		message1 = message1[0];
	} 
	else
	{
		message1 = null;
	}

	res.render('pagesInfo/signin',{
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
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

app.get('/dashboard', async (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;

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

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	let userData = await userService.getUserDetails(id);

	res.render('pagesInfo/dashboard', {
		isAuthenticated: req.session.isLoggedIn,
		errorMessage: message,
		sucessMessage: message1,
		username: name,
		id: id,
		uuid: uuid,
		userInfo: userData && userData.status == 1 && userData.userDetails.length > 0 ? userData : userData && userData.status == 0 ? userData.message : []
	});
});

app.get('/reset-password',  (req, res) =>
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

	res.render('pagesInfo/reset-password',{
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get(`/change-password`,  async(req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pagesInfo/change-password',{
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get(`/user-profile`, async (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

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

	res.render('pagesInfo/user-profile', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get('/find-partner',  (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	let message = req.flash('error');
	
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pagesInfo/find-partner', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		errorMessage: message
	});
});

app.get('/posts', async (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;
	var profilePicId = req.session.profilePicId;
	var profilePicName = req.session.profilePicName;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	let postDetails = await postService.getPostList();

	res.render('pagesInfo/posts', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		profilePicId : profilePicId,
		profilePicName : profilePicName,
		postInfo: postDetails && postDetails.status == 1 && postDetails.postList.length > 0 ? postDetails.postList : postDetails && postDetails.status == 0 ? postDetails.message : []
	});
});

app.get('/user-posts', async (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;
	var profilePicId = req.session.profilePicId;
	var profilePicName = req.session.profilePicName;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	let postDetails = await postService.getUserPostList(id);

	res.render('pagesInfo/user-posts', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		profilePicId: profilePicId,
		profilePicName: profilePicName,
		postInfo: postDetails && postDetails.status == 1 && postDetails.postList.length > 0 ? postDetails.postList : postDetails && postDetails.status == 0 ? postDetails.message : []
	});
});

app.get('/post-delete/:id', postService.deletePost);

app.get(`/userprofile/:id`, async (req, res) =>
{
	var id = req.session.userId;
	var name = req.session.name;
	var uuid = req.session.uuid;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	res.render('pagesInfo/singleUserProfile',
	{
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		userId: req.params.id,
		uuid: uuid,
		id: id
	});
});

app.get('/logout', async function (req, res)
{
	var id = req.session.userId;
	
	let params = {
		login: 0,
		logout: 1,
		logoutUpdatedAt: new Date()
	};

	await userDb.updateUser(id, params);
	
	req.session.destroy(function (err)
	{
		if (err)
		{
			res.status(404).render('pagesInfo/404',{
				isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false
			});
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

app.post('/api/reset/password', userService.resetPassword);

app.post('/api/change/password', userService.changePassword);

app.post('/api/update/user', userService.updateUser);

app.post('/api/user/id',async (req, res) =>
{
	let result =  res.json(await userService.getUserById(req.body));

	return result;
})

const documentUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) 
        {
            cb(null, config.upload_files);
        },
        filename: function (req, file, cb) 
        {
            cb(null, file.originalname);
        }
    })
});

app.post("/profile/pic/upload", documentUpload.single('file'), async (req, res) => 
{
	return res.json(await imageService.createProfilePicImage(req.file, req.body));
});

const imagesUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) 
        {
            cb(null, config.gallery_files);
        },
        filename: function (req, file, cb) 
        {
            cb(null, file.originalname);
        }
    })
});

app.post("/upload/images", imagesUpload.single('file_name'),galleryService.createImage); 

app.post("/follow/users/", async (req, res) => 
{
	return res.json(await followUsersService.createFollow(req.body));
});

app.post("/update/unfollow/users/", async (req, res) => 
{
	return res.json(await followUsersService.requestedForUnfollowUsers(req.body));
});

app.post("/update/follow/users/", async (req, res) => 
{
	return res.json(await followUsersService.requestedForfollowUsers(req.body));
});

const postUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) 
        {
            cb(null, config.gallery_files);
        },
        filename: function (req, file, cb) 
        {
            cb(null, file.originalname);
        }
    })
});

app.post("/upload/post/image",postUpload.single('filesInfo'), async (req, res) => 
{
	return res.json(await postImageService.createPostImage(req.body, req.file));
});

app.post('/api/add/post', postService.createPost);

app.post("/api/like",  async (req, res) => 
{
	return res.json(await postLikeService.postLikeList(req.body));
});

app.post("/api/update/like", async (req, res) => 
{
	return res.json(await postLikeService.createPostLike(req.body));
});

app.post("/api/update/unlike", async (req, res) => 
{
	return res.json(await postLikeService.updatePostLike(req.body));
});

app.post("/api/add/comment", async (req, res) => 
{
	return res.json(await postCommentService.createComment(req.body));
});

app.post("/api/comments", async (req, res) => 
{
	return res.json(await postCommentService.postCommentsList(req.body));
});

app.post('/api/add/find/post', postService.createFindPost);

app.all('*', (req, res, next) => 
{
    res.status(404).render('pagesInfo/404',{
		isAuthenticated: req.session.isLoggedIn
	});
});


module.exports = app;