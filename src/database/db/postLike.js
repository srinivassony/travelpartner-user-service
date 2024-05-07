const PostLike = require('../../database/model/postLike');

let getPostLikeList = async (userId, postId) =>
{
    return await PostLike.query().select().where({ userId: userId, postId: postId }).first();
}

let updatePostLike = async (id, data) =>
{
    return await PostLike.query().patchAndFetchById(id, data);
}

let createPostLike = async (data) =>
{
    return await PostLike.query().insert(data);
}

module.exports = {
    getPostLikeList: getPostLikeList,
    updatePostLike : updatePostLike,
    createPostLike :createPostLike
}