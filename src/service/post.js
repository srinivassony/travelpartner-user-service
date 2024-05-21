const db = require('../database/db/post');
const postImageDb = require('../database/db/postImages');
const common = require('../utils/utils');
const Status = common.Status;

exports.createPost = async (req, res) =>
{
    try 
    {
        let location = req.body.location ? req.body.location : null;
        let description  = req.body.descrip ? req.body.descrip : null;
        let imageIds = req.body.imageIds ? req.body.imageIds : null;
        let ids = imageIds.split(",");

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
            console.log(truncatedLocation);

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

exports.deletePost = async (req, res) =>
{
    try 
    {
        let postId = req.params.id ? req.params.id : null;
        
        if (!postId)
        {
            req.flash('error', 'Post id is requried.');

            res.redirect('/user-posts');

            return "";
        }

        let postData = await db.deletePost(postId);

        req.flash('success', 'Post Successfuly added!');

        res.redirect('/user-posts');

        return "";
    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/reset-password');

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
        console.log('date',date)

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

        console.log('params',params)

        let postData = await db.createFindPost(params);

        req.flash('success', 'Find Post Successfuly added!');

        res.redirect('/find-partner');

        return "";
    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/reset-password');

        return "";
    }
}