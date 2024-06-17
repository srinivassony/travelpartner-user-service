const Chat = require('../../database/model/chat');

const ChatView = require('../../database/model/chatView');


let createChat = async (data) =>
{
    return await Chat.query().insert(data);
}

let getMessages = async (sender, receiver) => 
{
    return await ChatView.query().select().where({
        sender: sender,
        receiver: receiver
    }).orWhere(
        {
            sender: receiver,
            receiver: sender
        }
    ).orderBy('createdAt','asc')
};

module.exports = {
    createChat: createChat,
    getMessages : getMessages
}
