const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class Chat extends guid(Model)
{
    static get tableName()
    {
        return `${tables.chat}`;
    }
}

module.exports = Chat;