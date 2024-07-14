const db = require('../database/db/post');
const postImageDb = require('../database/db/postImages');
const common = require('../utils/utils');
const Status = common.Status;
const moment = require('moment');

exports.createPost = async (req, res) =>
{
    try 
    {
        let location = req.body.location ? req.body.location : null;
        let description  = req.body.descrip ? req.body.descrip : null;
        let imageIds = req.body.imageIds ? req.body.imageIds : null;
        let ids = imageIds ? imageIds.split(",") : [];

        if (!location)
        {
            req.flash('error', 'Location is requried.');

            res.redirect('/find-partner');

            return "";
        }

        if(ids && ids.length == 0)
        {
            req.flash('error', 'please upload the image.');

            res.redirect('/find-partner');

            return "";
        }

        if (!description)
         {
            req.flash('error', 'Description is requried.');

            res.redirect('/find-partner');

            return "";
        }

        if (!imageIds)
         {
            req.flash('error', 'Images is not uploaded can you please refreash the page and try to upload again.');

            res.redirect('/find-partner');

            return "";
        }

        let params = {
            location: location,
            description: description,
            userId: req.body.userId,
            createdAt: new Date(),
            createdBy: req.body.uuid
        }

        let postData = await db.createPost(params);

        if(postData)
        {
            let postImageParams = {
                postId : postData.id,
                updatedAt : new Date(),
                updatedBy: req.body.uuid
            }

            let updatePostImage = await postImageDb.updatePostImage(ids, postImageParams);
        }
        
        req.flash('success', 'Post Successfuly added!');

        res.redirect('/posts');

        return "";
    } 
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/reset-password');

        return "";
    }
}

function truncateLocation(location, maxLength)
{
    if (location.length <= maxLength)
    {
        return location;
    } 
    else
    {
        return location.substring(0, maxLength) + '...';
    }
}

exports.getPostList = async () =>
{
    try
    {
        let postList = await db.getPostList();

        for (let postIndex = 0; postIndex < postList.length; postIndex++)
        {
            let post = postList[postIndex];

            const truncatedLocation = truncateLocation(post.location, 30);

            post.truncatedLocation = truncatedLocation;

            let postImages = post && post.postImages ? JSON.parse(post.postImages) : [];

            post.postImages = postImages
        }

        return {
            status: Status.SUCCESS,
            postList: postList
        }
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.getUserPostList = async (id) =>
{
    try
    {
        let postList = await db.getUserPostList(id);

        for (let postIndex = 0; postIndex < postList.length; postIndex++)
        {
            let post = postList[postIndex];

            const truncatedLocation = truncateLocation(post.location, 30);

            post.truncatedLocation = truncatedLocation;

            let postImages = post && post.postImages ? JSON.parse(post.postImages) : [];

            post.postImages = postImages
        }

        return {
            status: Status.SUCCESS,
            postList: postList
        }
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.deletePost = async (reqParams, req, res) =>
{
    try 
    {
        let postId = reqParams.id ? reqParams.id : null;

        if (!postId)
        {
            req.flash('error', 'Post id is requried.');

            res.redirect('/find-posts');

            return "";
        }

        let postData = await db.deletePost(postId);

        req.flash('success', 'Post deleted!');

        res.redirect('/find-posts');

        return "";
    }
    catch (error) 
    {
        req.flash('error', error);

        res.redirect('/find-posts');

        return "";
    }
}

exports.createFindPost = async (req, res) =>
{
    try 
    {
        let location = req.body.tripLocation ? req.body.tripLocation : null;
        let date = req.body.tripDate ? req.body.tripDate : null;
        let description = req.body.TripDescrip ? req.body.TripDescrip : null;

        if (!location)
        {
            req.flash('error', 'Trip location is requried.');

            res.redirect('/find-partner');

            return "";
        }

        if (!date)
        {
            req.flash('error', 'Trip date is requried.');

            res.redirect('/find-partner');

            return "";
        }

        if (!description)
        {
            req.flash('error', 'Trip description is requried.');

            res.redirect('/find-partner');

            return "";
        }

        let params = {
            tripLocation: location.trim(),
            tripDate: date,
            tripDescription: description,
            userId: req.body.userId,
            createdAt: new Date(),
            createdBy: req.body.uuid
        }

        let postData = await db.createFindPost(params);

        req.flash('postData', JSON.stringify(postData));

        res.redirect('/find-posts');

        return "";
    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/reset-password');

        return "";
    }
}

exports.getFindPost = async (postInfo, req, res) =>
{
    try
    {
        if (!postInfo)
        {
                req.flash('error', 'Post details is not found!');

                res.redirect('/find-partner'); 
        }

        let location = postInfo && postInfo.tripLocation ? postInfo.tripLocation : null;

        let findPostList = await db.getFindPost(location);

        console.log('findPostList',findPostList)

        for (let postIndex = 0; postIndex < findPostList.length; postIndex++)
        {
            let post = findPostList[postIndex];

            const date = moment(post.tripDate);
            post.tripDate = common.formatDate(date);

            let followUsers = post && post.followUsers ? JSON.parse(post.followUsers) : [];

            post.followUsers = followUsers;
        }

        return {
            status: Status.SUCCESS,
            findPostList: findPostList
        }
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.getFindAllPost = async () =>
{
    try
    {
        let findPostList = await db.getFindAllPost();

        if (findPostList.length == 0)
        {
            return {
                status: Status.FAIL,
                message: 'Post details not found!'
            }
        }

        for (let postIndex = 0; postIndex < findPostList.length; postIndex++)
        {
            let post = findPostList[postIndex];

            const date = moment(post.tripDate);
            post.tripDate = common.formatDate(date);

            let followUsers = post && post.followUsers ? JSON.parse(post.followUsers) : [];

            post.followUsers = followUsers;
        }

        return {
            status: Status.SUCCESS,
            findPostList: findPostList
        }
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.deleteFindPost = async (reqParams, req, res) =>
{
    try 
    {
        let postId = reqParams.id ? reqParams.id : null;

        if (!postId)
        {
            req.flash('error', 'Post id is requried.');

            res.redirect('/travel-posts');

            return "";
        }

        let postData = await db.deleteFindPost(postId);

        req.flash('success', 'Post deleted!');

        res.redirect('/travel-posts');

        return "";
    }
    catch (error) 
    {
        req.flash('error', error);

        res.redirect('/travel-posts');

        return "";
    }
}

exports.getUserSavedPostList = async (id) =>
{
    try
    {
        let findSavedPostList = await db.getUserSavedPostList(id);

        if (findSavedPostList.length == 0)
        {
            return {
                status: Status.FAIL,
                message: 'saved post details not found!'
            }
        }

        for (let postIndex = 0; postIndex < findSavedPostList.length; postIndex++)
        {
            let post = findSavedPostList[postIndex];

            const date = moment(post.tripDate);
            post.tripDate = common.formatDate(date);

            let followUsers = post && post.followUsers ? JSON.parse(post.followUsers) : [];

            post.followUsers = followUsers;
        }

        return {
            status: Status.SUCCESS,
            findSavedPostList: findSavedPostList
        }
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}