const Post = require('../../database/model/post');
const PostView = require('../../database/model/postView');
const findPost = require('../model/find-post');
const { knex } = require('./db-config');
const { FETCH_FIND_POSTS_JOINS } = require('../function/function');
const findPostView = require('../../database/model/findPostView');
const findSavedPostView = require('../../database/model/savedPostView');


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

let createFindPost = async (data) =>
{
  return await findPost.query().insert(data);
}

let getFindPost = async (location) =>
{
  return await findPostView.query().select().where({tripLocation : location}).orderBy('createdAt','desc');
}

let getFindAllPost = async () =>
{
  return await findPostView.query().select().orderBy('createdAt', 'desc');
}

let deleteFindPost = async (id) =>
{
  return await findPost.query().delete().where({ id: id });
}

let getUserSavedPostList = async (id) =>
{
  return await findSavedPostView.query().select().where({ savedUserId: id });
}

let getFindAllPostById = async (id) =>
{
  return await findPostView.query().select().where({ id: id }).first();
}

let updateFindPost = async (id, data) =>
{
  return await findPost.query().patchAndFetchById(id, data);
}

module.exports = {
  createPost: createPost,
  getPostList: getPostList,
  getUserPostList: getUserPostList,
  deletePost: deletePost,
  createFindPost: createFindPost,
  getFindPost: getFindPost,
  getFindAllPost :getFindAllPost,
  deleteFindPost: deleteFindPost,
  getUserSavedPostList: getUserSavedPostList,
  getFindAllPostById: getFindAllPostById,
  updateFindPost: updateFindPost
}
