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

        console.log('postCommentList',postCommentList)
        
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