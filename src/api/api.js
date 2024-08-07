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
let chatService = require('../service/chat');


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

app.get('/saved-posts', async (req, res) =>
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

	let savedPostDetails = await postService.getUserSavedPostList(id, req, res);

	res.render('pagesInfo/find-saved-posts', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		profilePicId: profilePicId,
		profilePicName: profilePicName,
		savedPostInfo: savedPostDetails && savedPostDetails.status == 1 && savedPostDetails.findSavedPostList.length > 0 ? savedPostDetails.findSavedPostList : savedPostDetails && savedPostDetails.status == 0 ? savedPostDetails : []
	});
});

app.get("/post-delete/:id", async (req, res) => 
{
	return res.json(await postService.deletePost(req.params, req, res));
});

app.get("/find-post-delete/:id", async (req, res) => 
{
	return res.json(await postService.deleteFindPost(req.params, req, res));
});

app.get('/find-posts', async (req, res) =>
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

	let postInfo = req.flash('postData');

	if (postInfo.length > 0)
	{
		postInfo = JSON.parse(postInfo[0]);
	} 
	else if(req.session.postInfo != null)
	{
		postInfo = JSON.parse(req.session.postInfo[0]);
	}
	else
	{
		postInfo = null;
	}

	let findPostInfo = await postService.getFindPost(postInfo, req, res);

	res.render('pagesInfo/find-posts', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		errorMessage: message,
		sucessMessage: message1,
		profilePicId: profilePicId,
		profilePicName: profilePicName,
		findPostDeatils: findPostInfo && findPostInfo.status == 1 && findPostInfo.findPostList.length > 0 ? findPostInfo.findPostList : findPostInfo && findPostInfo.status == 0 ? findPostInfo.message : []
	});
});

app.get('/travel-posts', async (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	console.log('id',id)
	var uuid = req.session.uuid;
	var profilePicId = req.session.profilePicId;
	var profilePicName = req.session.profilePicName;

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

	let findPostInfo = await postService.getFindAllPost(req.query);

	res.render('pagesInfo/find-all-posts', {
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		id: id,
		uuid: uuid,
		profilePicId: profilePicId,
		profilePicName: profilePicName,
		errorMessage: message,
		sucessMessage: message1,
		findPostDeatils: findPostInfo && findPostInfo.status == 1 && findPostInfo.findPostList.length > 0 ? findPostInfo.findPostList : findPostInfo && findPostInfo.status == 0 ? findPostInfo : []
	});
});

app.get(`/userprofile/:id`, async (req, res) =>
{
	var id = req.session.userId;
	var name = req.session.name;
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

	let userInfo = await userService.getUserById(req.params, req, res)

	res.render('pagesInfo/singleUserProfile',
	{
		isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
		username: name,
		userId: req.params.id,
		uuid: uuid,
		id: id,
		errorMessage: message,
		userInfo: userInfo && userInfo.status == 1 && userInfo.userDetails ? userInfo.userDetails : userInfo && userInfo.status == 0 ? userInfo : null
	});
});

app.get(`/chat`, async (req, res) =>
{
	var id = req.session.userId;
	var name = req.session.name;
	var uuid = req.session.uuid;
	var profilePicId = req.session.profilePicId ? req.session.profilePicId : null;
	var profilePicName = req.session.profilePicName ? req.session.profilePicName : null;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	let followUsers = await followUsersService.getFollowUsers(id);

	res.render('pagesInfo/chat',
		{
			isAuthenticated: req.session.isLoggedIn ? req.session.isLoggedIn : false,
			username: name,
			userId: req.params.id,
			uuid: uuid,
			id: id,
			profilePicId: profilePicId,
			profilePicName: profilePicName,
			followUsersInfo : followUsers && followUsers.status == 1 && followUsers.followUsersList.length > 0 ? followUsers.followUsersList : followUsers && followUsers.status == 0 ? followUsers : []
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
	let result = res.json(await userService.getUserById(req.body, req, res));

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

app.post('/api/edit/find/post', postService.updateFindPost);

app.post("/api/find/post/like", async (req, res) => 
{
	return res.json(await postLikeService.getFindPostLikeList(req.body));
});

app.post("/api/update/find/post/like", async (req, res) => 
{
	return res.json(await postLikeService.createFindPostLike(req.body));
});

app.post("/api/update/find/post/unlike", async (req, res) => 
{
	return res.json(await postLikeService.updateFindPostUnlike(req.body));
});

app.post("/api/add/find/post/comment", async (req, res) => 
{
	return res.json(await postCommentService.createFindPostComment(req.body, req, res));
});

app.post("/api/find/post/comments", async (req, res) => 
{
	return res.json(await postCommentService.getFindPostCommentsList(req.body));
});

app.post("/api/find/post/save", async (req, res) => 
{
	return res.json(await postLikeService.getFindPostSavedList(req.body));
});

app.post("/api/update/find/post/save", async (req, res) => 
{
	return res.json(await postLikeService.createFindPostSaved(req.body));
});

app.post("/api/update/find/post/unsave", async (req, res) => 
{
	return res.json(await postLikeService.updateFindPostUnSave(req.body));
});

app.post("/api/add/message", async (req, res) => 
{
	return res.json(await chatService.createChat(req.body));
});

app.post("/api/messages", async (req, res) => 
{
	return res.json(await chatService.getMessages(req.body));
});

app.get('/find-post-edit/:id', async (req, res) =>
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

	let postData = await postService.getFindAllPostById(req.params.id);

	console.log('postData', postData)

	res.render('pagesInfo/edit-find-post', {
		isAuthenticated: req.session.isLoggedIn,
		errorMessage: message,
		sucessMessage: message1,
		username: name,
		id: id,
		uuid: uuid,
		postInfo: postData && postData.status == 1 && postData.findPostInfo ? postData.findPostInfo : postData && postData.status == 0 ? postData.message : null
	});
});
	
app.all('*', (req, res, next) => 
{
    res.status(404).render('pagesInfo/404',{
		isAuthenticated: req.session.isLoggedIn
	});
});


module.exports = app;