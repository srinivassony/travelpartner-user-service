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

exports.getPostList = async () =>
{
    try
    {
        let postList = await db.getPostList();

        if(postList.length == 0)
        {
            return {
                status: Status.FAIL,
                message: "Post details not found!"
            }
        }

        for (let postIndex = 0; postIndex < postList.length; postIndex++)
        {
            let post = postList[postIndex];

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
