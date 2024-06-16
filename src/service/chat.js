const db = require('../database/db/chat');
const common = require('../utils/utils');
const Status = common.Status;

exports.createChat = async (reqParams) =>
{
    try 
    {
        let sender = reqParams.sender ? reqParams.sender : null;
        let receiver = reqParams.receiver ? reqParams.receiver : null;
        let message = reqParams.message ? reqParams.message : null;

        let params = {
            sender: sender,
            receiver: receiver,
            message : message,
            userId: reqParams.userId,
            createdAt: new Date(),
            createdBy: reqParams.uuid
        }

        let chatData = await db.createChat(params);
      
        return {
            status: Status.SUCCESS,
            chatData: chatData
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