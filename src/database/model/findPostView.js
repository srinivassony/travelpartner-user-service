const { Model } = require("../db/db-config");
const tables = require('../model/table');

class FindPostView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_find_post}`;
    }
}

module.exports = FindPostView;