const User = require("../../database/model/user");

const NotificationView = require("../../database/model/notificationView");

const Notification = require("../../database/model/notification");

let getExsitingUserDetails = async (email, phone) =>
{
  return await User.query().select().where('email', email).first();
}

let createUser = async(data) =>
{
    return await User.query().insert(data);
}

let getUserLoginDetails = async (email) => 
{
  return await User.query().select().where({email: email}).first()
}

let getUserDetailsById = async(id) =>
{
  return await User.query().select().where('id', id).withGraphFetched('[image,gallerys]').first();
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