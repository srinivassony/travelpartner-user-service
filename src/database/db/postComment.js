const PostComment = require('../../database/model/postComment');
const PostCommentView = require('../../database/model/commentView');


let createPostComment = async (data) =>
{
    return await PostComment.query().insert(data);
}

let getPostCommentList = async (userId, postId) =>
{
    return await PostCommentView.query().select().where({  postId: postId });
}

module.exports = {
    createPostComment: createPostComment,
    getPostCommentList: getPostCommentList
}