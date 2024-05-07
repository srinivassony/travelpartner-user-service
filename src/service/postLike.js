const db = require('../database/db/postLike');
const common = require('../utils/utils');
const Status = common.Status;

exports.postLikeList = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postLikeList = await db.getPostLikeList(userId, postId);

        if (!postLikeList)
        {
            return {
                status: Status.FAIL,
                message: "Post details not found!"
            }
        }

        return {
            status: Status.SUCCESS,
            postLikeList: postLikeList
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

exports.createPostLike = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postLikeList = await db.getPostLikeList(userId, postId);

        if (postLikeList)
        {
            let likeParams = {
                isLike: 1,
                updatedAt: new Date(),
                updatedBy: reqParams.uuid
            }

            let postLike = await db.updatePostLike(postLikeList.id, likeParams);

            return {
                status: Status.SUCCESS,
                postLike: postLike
            }
        }
        else
        {
            let likeParams = {
                userId: userId,
                postId: postId,
                isLike: 1,
                createdAt: new Date(),
                createdBy: reqParams.uuid
            }

            let postLike = await db.createPostLike(likeParams);

            return {
                status: Status.SUCCESS,
                postLike: postLike
            }
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

exports.updatePostLike = async (reqParams) =>
    {
        try
        {
            let userId = reqParams.id ? reqParams.id : null;
            let postId = reqParams.postId ? reqParams.postId : null;
        
            let postLikeList = await db.getPostLikeList(userId, postId);
    
            if (!postLikeList)
            {
                return {
                    status: Status.FAIL,
                    message: "Post details not found!"
                }
            }

            let likeParams = {
                isLike: 0,
                updatedAt: new Date(),
                updatedBy: reqParams.uuid
            }

            let postLike = await db.updatePostLike(postLikeList.id, likeParams);

            return {
                status: Status.SUCCESS,
                postLike: postLike
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