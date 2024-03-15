const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class User extends guid(Model)
{
    static get tableName()
    {
        return `${tables.user}`;
    }
}

module.exports = User;