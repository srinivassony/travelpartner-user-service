const PostComment = require('../../database/model/postComment');
const PostCommentView = require('../../database/model/commentView');
const FindPostComment = require('../../database/model/findPostComment');
const FindPostCommentView = require('../../database/model/findPostCommentView');

let createPostComment = async (data) =>
{
    return await PostComment.query().insert(data);
}

let getPostCommentList = async (userId, postId) =>
{
    return await PostCommentView.query().select().where({  postId: postId }).orderBy('createdAt', 'desc');
}

let createFindPostComment = async (data) =>
{
    return await FindPostComment.query().insert(data);
}

let getFindPostCommentList = async (userId, postId) =>
{
    return await FindPostCommentView.query().select().where({ findPostId: postId }).orderBy('createdAt', 'desc');
}

module.exports = {
    createPostComment: createPostComment,
    getPostCommentList: getPostCommentList,
    createFindPostComment: createFindPostComment,
    getFindPostCommentList: getFindPostCommentList
}