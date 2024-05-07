const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class FollowUsers extends guid(Model)
{
    static get tableName()
    {
        return `${tables.followUsers}`;
    }
}

module.exports = FollowUsers;