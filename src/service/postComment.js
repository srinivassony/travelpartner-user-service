const db = require('../database/db/postComment');
const common = require('../utils/utils');
const Status = common.Status;

exports.createComment = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;
        let message = reqParams.message ? reqParams.message : null;


        let messageParams = {
            userId: userId,
            postId: postId,
            comment: message,
            createdAt: new Date(),
            createdBy: reqParams.uuid
        }

        let postComment = await db.createPostComment(messageParams);

        return {
            status: Status.SUCCESS,
            postComment: postComment
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

exports.postCommentsList = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let postCommentList = await db.getPostCommentList(userId, postId);

        return {
            status: Status.SUCCESS,
            postCommentList: postCommentList
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

exports.createFindPostComment = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;
        let message = reqParams.message ? reqParams.message : null;


        let messageParams = {
            userId: userId,
            findPostId: postId,
            comment: message,
            createdAt: new Date(),
            createdBy: reqParams.uuid
        }

        let findPostComment = await db.createFindPostComment(messageParams);

        return {
            status: Status.SUCCESS,
            findPostComment: findPostComment
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

exports.getFindPostCommentsList = async (reqParams) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;
        let postId = reqParams.postId ? reqParams.postId : null;

        let findPostCommentList = await db.getFindPostCommentList(userId, postId);

        console.log('findPostCommentList', findPostCommentList)

        return {
            status: Status.SUCCESS,
            findPostCommentList: findPostCommentList
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