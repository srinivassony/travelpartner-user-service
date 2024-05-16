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

let getUserPostList = async (id) =>
{
  return await PostView.query().select().where({userId : id});
}

let deletePost = async (id) =>
{
  return await Post.query().delete().where({ id: id });
}

module.exports = {
  createPost: createPost,
  getPostList: getPostList,
  getUserPostList: getUserPostList,
  deletePost: deletePost
}
