const { Model } = require("../db/db-config");
const tables = require('../model/table');

class ChatView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_chat}`;
    }
}

module.exports = ChatView;