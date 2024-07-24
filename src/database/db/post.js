const Post = require('../../database/model/post');
const PostView = require('../../database/model/postView');
const findPost = require('../model/find-post');
const { knex } = require('./db-config');
const { FETCH_FIND_POSTS_JOINS } = require('../function/function');
const findPostView = require('../../database/model/findPostView');
const findSavedPostView = require('../../database/model/savedPostView');

const {
	ValidationError,
	NotFoundError,
	DBError,
	ConstraintViolationError,
	UniqueViolationError,
	NotNullViolationError,
	ForeignKeyViolationError,
	CheckViolationError,
	DataError,
    raw
} = require('objection');

function objectionErrorHandler(error)
{
  let errorMessage = error.message.split(`ORA-0${error.errorNum}:`).pop();

  if (error instanceof ValidationError)
  {
    switch (error.type)
    {
      case 'ModelValidation':
        return {
          status: 0,
          errorCode: "DB",
          message: error.message,
          type: error.type,
          error: error.data
        };

      case 'RelationExpression':
        return {
          status: 0,
          errorCode: "DB",
          message: error.message,
          type: 'RelationExpression',
          error: error
        };

      case 'UnallowedRelation':
        return {
          status: 0,
          errorCode: "DB",
          message: error.message,
          type: error.type,
          error: error
        };

      case 'InvalidGraph':
        return {
          status: 0,
          errorCode: "DB",
          message: error.message,
          type: error.type,
          error: error
        };

      default:
        return {
          status: 0,
          errorCode: "DB",
          message: error.message,
          type: 'UnknownValidationError',
          error: error
        };
    }
  }
  else if (error instanceof NotFoundError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'NotFound',
      error: error
    };
  }
  else if (error instanceof UniqueViolationError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'UniqueViolation',
      error: {
        columns: error.columns,
        table: error.table,
        constraint: error.constraint
      }
    };
  }
  else if (error instanceof NotNullViolationError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'NotNullViolation',
      error: {
        column: error.column,
        table: error.table
      }
    };
  }
  else if (error instanceof ForeignKeyViolationError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'ForeignKeyViolation',
      error: {
        table: error.table,
        constraint: error.constraint
      }
    };
  }
  else if (error instanceof CheckViolationError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'CheckViolation',
      error: {
        table: error.table,
        constraint: error.constraint
      }
    };
  }
  else if (error instanceof DataError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'InvalidData',
      error: error
    };
  }
  else if (error instanceof DBError)
  {
    return {
      status: 0,
      errorCode: "DB",
      message: error.message,
      type: 'UnknownDatabaseError',
      error: error
    };
  }
  else
  {
    return {
      status: 0,
      errorCode: "DB",
      message: errorMessage,
      type: 'UnknownError',
      error: error
    };
  }
}


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
  try
  {
    return await findPost.query().insert(data);
  }
  catch (error)
  {
    return objectionErrorHandler(error);
  }
}

let getFindPost = async (location) =>
{
  return await findPostView.query().select().where({tripLocation : location}).orderBy('createdAt','desc');
}

let getFindAllPost = async (searchKey) =>
{
  try
  {
    let query = findPostView.query().select()

    if(searchKey)
    {
      query.where(function()
      {
          this.orWhereRaw(`LOWER(TRIM("userName")) like q'[%${searchKey.toLowerCase().replace(/[%_]/g,m=>chars[m])}%]' ESCAPE '!'`)
          .orWhereRaw(`LOWER(TRIM("tripLocation")) like q'[%${searchKey.toLowerCase().replace(/[%_]/g,m=>chars[m])}%]' ESCAPE '!'`)
          .orWhereRaw(`TO_CHAR(TRUNC("tripDate"),'MM/DD/YYYY') like q'[%${searchKey}%]'`)
      })
    }
    
    query.orderBy('createdAt', 'desc')

    return await query;
  }
  catch(error)
  {
    return objectionErrorHandler(error);
  }
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
