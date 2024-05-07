const { Model } = require("../db/db-config");
const tables = require('../model/table');

class PostView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_post}`;
    }
}

module.exports = PostView;