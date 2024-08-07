const FollowUser = require("../../database/model/follow-users");

const Notification = require("../../database/model/notification");

const FollowUserView = require("../../database/model/followUsersView");


let createFollow = async (data, NotificationParams) =>
{
    const transaction = await FollowUser.startTransaction();

    try 
    {

        let followUsers = await FollowUser.query().insertGraph(data);

        let notifications =  await Notification.query().insert(NotificationParams);

        await transaction.commit();

        return {
            followUsers : followUsers,
            notifications :notifications
        };
    } 
    catch (error) 
    {
        await transaction.rollback();
        return {error: error}
    } 
}

let createNotification = async(data) =>
{
    return await Notification.query().insert(data);
}

let getFollowDetails = async (followingId, followerId) => 
{
  return await FollowUser.query().select().where({
    followerId: followerId,
    followingId : followingId
}).orWhere(
    {
        followerId: followingId,
        followingId : followerId
    }
)
};

let updateRequestedForUnfollowUsers = async (ids, data, NotificationParams) =>
{
    const transaction = await FollowUser.startTransaction();

    try 
    {
        let notifications = null;

        let followUsers = await FollowUser.query(transaction).update(data).whereIn('id', ids);

        if(NotificationParams)
        {
            notifications =  await Notification.query(transaction).insert(NotificationParams);
        }

        await transaction.commit();

        return {
            followUsers : followUsers,
            notifications :notifications
        };
    } 
    catch (error) 
    {
        await transaction.rollback();
        return {error: error}
    } 
}

let updateRequestedForFollowUsers = async (ids, Followparams, followingId, notificationParams) =>
{
    const transaction = await FollowUser.startTransaction();

    try 
    {

        let followUsers = await FollowUser.query(transaction).update(Followparams).whereIn('id', ids);

        let notifications = await Notification.query(transaction).update(notificationParams).where('notificationTo', followingId);

        await transaction.commit();

        return {
            followUsers: followUsers,
            notifications: notifications
        };
    } 
    catch (error) 
    {
        await transaction.rollback();
        return {error: error}
    } 
}

let getFollowUsers = async (id) => 
    {
      return await FollowUserView.query().select().where({
        followerId: id
    }).orWhere(
        {
            followingId : id
        }
    )
    };

module.exports ={
    createFollow: createFollow,
    createNotification: createNotification,
    getFollowDetails: getFollowDetails,
    updateRequestedForUnfollowUsers: updateRequestedForUnfollowUsers,
    updateRequestedForFollowUsers: updateRequestedForFollowUsers,
    getFollowUsers: getFollowUsers
  }