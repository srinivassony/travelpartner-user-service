const { Model } = require("../db/db-config");
const tables = require('../model/table');

class FollowUsersView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_follow_users}`;
    }
}

module.exports = FollowUsersView;