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

exports.getFindPostLikeList = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let findPostLikeList = await db.getFindPostLikeList(userId, postId);

        if (!findPostLikeList)
        {
            return {
                status: Status.FAIL,
                message: "Post details not found!"
            }
        }

        return {
            status: Status.SUCCESS,
            findPostLikeList: findPostLikeList
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

exports.createFindPostLike = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postLikeList = await db.getFindPostLikeList(userId, postId);

        if (postLikeList)
        {
            let likeParams = {
                isLike: 1,
                updatedAt: new Date(),
                updatedBy: reqParams.uuid
            }

            let findPostLike = await db.updateFindPostLike(postLikeList.id, likeParams);

            return {
                status: Status.SUCCESS,
                findPostLike: findPostLike
            }
        }
        else
        {
            let likeParams = {
                userId: userId,
                findPostId: postId,
                isLike: 1,
                createdAt: new Date(),
                createdBy: reqParams.uuid
            }

            let findPostLike = await db.createFindPostLike(likeParams);

            return {
                status: Status.SUCCESS,
                findPostLike: findPostLike
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

exports.updateFindPostUnlike = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postLikeList = await db.getFindPostLikeList(userId, postId);

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

        let findPostLike = await db.updateFindPostLike(postLikeList.id, likeParams);

        return {
            status: Status.SUCCESS,
            findPostLike: findPostLike
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

exports.getFindPostSavedList = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let findPostSavedList = await db.getFindPostSavedList(userId, postId);

        if (!findPostSavedList)
        {
            return {
                status: Status.FAIL,
                message: "Post details not found!"
            }
        }

        return {
            status: Status.SUCCESS,
            findPostSavedList: findPostSavedList
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

exports.createFindPostSaved = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postSaveList = await db.getFindPostSavedList(userId, postId);

        if (postSaveList)
        {
            let saveParams = {
                isSave: 1,
                updatedAt: new Date(),
                updatedBy: reqParams.uuid
            }

            let findPostSave = await db.updateFindPostSave(postSaveList.id, saveParams);

            return {
                status: Status.SUCCESS,
                findPostSave: findPostSave
            }
        }
        else
        {
            let saveParams = {
                userId: userId,
                findPostId: postId,
                isSave: 1,
                createdAt: new Date(),
                createdBy: reqParams.uuid
            }

            let findPostSave = await db.createFindPostSave(saveParams);

            return {
                status: Status.SUCCESS,
                findPostSave: findPostSave
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

exports.updateFindPostUnSave = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postSaveList = await db.getFindPostSavedList(userId, postId);

        if (!postSaveList)
        {
            return {
                status: Status.FAIL,
                message: "Post details not found!"
            }
        }

        let saveParams = {
            isSave: 0,
            updatedAt: new Date(),
            updatedBy: reqParams.uuid
        }

        let findPostSave = await db.updateFindPostSave(postSaveList.id, saveParams);

        return {
            status: Status.SUCCESS,
            findPostSave: findPostSave
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