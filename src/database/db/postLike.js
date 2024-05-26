const PostLike = require('../../database/model/postLike');
const FindPostLike = require('../../database/model/findPostLike');
const FindPostSave = require('../../database/model/findPostSave');

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

let getFindPostLikeList = async (userId, postId) =>
{
    return await FindPostLike.query().select().where({ userId: userId, findPostId: postId }).first();
}

let updateFindPostLike = async (id, data) =>
{
    return await FindPostLike.query().patchAndFetchById(id, data);
}

let createFindPostLike = async (data) =>
{
    return await FindPostLike.query().insert(data);
}

let getFindPostSavedList = async (userId, postId) =>
{
    return await FindPostSave.query().select().where({ userId: userId, findPostId: postId }).first();
}

let createFindPostSave = async (data) =>
{
    return await FindPostSave.query().insert(data);
}

let updateFindPostSave = async (id, data) =>
{
    return await FindPostSave.query().patchAndFetchById(id, data);
}

module.exports = {
    getPostLikeList: getPostLikeList,
    updatePostLike : updatePostLike,
    createPostLike :createPostLike,
    getFindPostLikeList: getFindPostLikeList,
    updateFindPostLike: updateFindPostLike,
    createFindPostLike: createFindPostLike,
    getFindPostSavedList: getFindPostSavedList,
    createFindPostSave: createFindPostSave,
    updateFindPostSave: updateFindPostSave
}