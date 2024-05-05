const Post = require('../../database/model/post');
const PostView = require('../../database/model/postView');


let createPost = async (data) =>
{
    return await Post.query().insert(data);
}

let getPostList = async() =>
{
  return await PostView.query().select();
}

module.exports = {
    createPost: createPost,
    getPostList: getPostList
}
