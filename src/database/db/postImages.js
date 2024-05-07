const PostImages = require("../../database/model/postImages");

let createPostImage = async (data) =>
{
    return await PostImages.query().insert(data);
}

let updatePostImage = async (ids, data) =>
{
    return await PostImages.query().update(data).whereIn('id', ids);
}

module.exports = {
    createPostImage: createPostImage,
    updatePostImage: updatePostImage
}