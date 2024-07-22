const User = require("../../database/model/user");

const NotificationView = require("../../database/model/notificationView");

const Notification = require("../../database/model/notification");

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

let getExsitingUserDetails = async (email, phone) =>
{
  try
  {
    return await User.query().select().where('email', email).first();
  }
  catch(error)
  {
    return objectionErrorHandler(error);
  }
}

let createUser = async(data) =>
{
    return await User.query().insert(data);
}

let getUserLoginDetails = async (email) => 
{
  try
  {
    return await User.query().select().where({ email: email }).first()
  }
  catch (error)
  {
    return objectionErrorHandler(error);
  }
}

let getUserDetailsById = async(id) =>
{
  return await User.query().select().where('id', id).withGraphFetched('[followUsers,image,gallerys]').first();
}

let updateUser = async (id, data) =>
{
    return await User.query().patchAndFetchById(id, data).withGraphFetched('[image]');
}

let getUserByEmailId = async(email) =>
{
  return await User.query().select().where('email', email).first();
}

let getUserDetails = async(id) =>
{
  return await User.query().select().where({ isRegistered: 1, isInvited: 1 }).whereNot({
    id: id
  }).withGraphFetched('[image,gallerys,followUsers]');
}

let getNotificationDetails = async(userId) =>
{
  return await NotificationView.query().select().where('notificationTo', userId);
}

let deleteNotification = async(id) =>
{
  return await Notification.query().delete().where('notificationFrom', id);
}

module.exports ={
  getExsitingUserDetails : getExsitingUserDetails,
  createUser: createUser,
  getUserLoginDetails: getUserLoginDetails,
  getUserDetailsById: getUserDetailsById,
  updateUser: updateUser,
  getUserByEmailId: getUserByEmailId,
  getUserDetails: getUserDetails,
  getNotificationDetails: getNotificationDetails,
  deleteNotification: deleteNotification
}