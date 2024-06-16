const Chat = require('../../database/model/chat');

let createChat = async (data) =>
{
    return await Chat.query().insert(data);
}

module.exports = {
    createChat: createChat
}
