const db = require('../database/db/follow-users');
const common = require('../utils/utils');
const Status = common.Status;

exports.createFollow = async (reqParams) =>
{
    try 
    {
        let followingId = reqParams.followingId ? reqParams.followingId : null;

        let followerId = reqParams.followerId?  reqParams.followerId : null;

        let getFollowDetails = await db.getFollowDetails(followingId, followerId);

        if (getFollowDetails.length > 0)
        {
            let ids = getFollowDetails.filter(follow => follow.id).map(follow => follow.id);

            let params = 
            {
                requested : 1,
                userId : reqParams.userId,
                updatedBy : reqParams.uuid,
                updatedAt : new Date()
            };
    
            let followUser = await db.updateRequestedForUnfollowUsers(ids ,params);

            return {
                status: Status.SUCCESS,
                followUser: followUser
            }
        }
        else
        {
            let params = [{
                followerId : followerId,
                followingId : followingId,
                userId : reqParams.userId,
                requested : 1,
                createdBy : reqParams.uuid,
                createdAt : new Date()
            },
            {
                followerId :  followingId,
                followingId : followerId,
                userId : reqParams.userId,
                requested : 1,
                createdBy : reqParams.uuid,
                createdAt : new Date()
            }]
    
            console.log('params',params)

            let NotificationParams =
            {
                subject: "Friend request sent",
                notificationFrom : followerId,
                notificationTo : followingId, 
                userId: reqParams.userId,
                createdAt: new Date(),
                createdBy: reqParams.uuid
            };

            console.log('NotificationParams',NotificationParams)
    
            let followUser_notification = await db.createFollow(params, NotificationParams);
    
            console.log('followUser_notification',followUser_notification)

            return {
                status: Status.SUCCESS,
                followUser_notification: followUser_notification
            }
        }
    } 
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.requestedForUnfollowUsers = async (reqParams) =>
{
    try 
    {
        let followingId = reqParams.followingId ? reqParams.followingId : null;

        let followerId = reqParams.followerId?  reqParams.followerId : null;

        let getFollowDetails = await db.getFollowDetails(followingId, followerId);

        if(getFollowDetails.length == 0)
        {
            return {
                status: Status.FAIL,
                message: "Data not found!"
            }
        }

        let ids = getFollowDetails.filter(follow =>follow.id ).map(follow =>follow.id);

        let params = 
        {
            requested : 0,
            updatedBy : reqParams.uuid,
            updatedAt : new Date()
        };

        console.log('params',params)

        let followUser = await db.updateRequestedForUnfollowUsers(ids ,params);

        console.log('followUser',followUser)

        return {
            status: Status.SUCCESS,
            followUser: followUser
        }
    } 
    catch (error) 
    {
        console.log(error)
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}