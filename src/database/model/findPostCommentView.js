const { Model } = require("../db/db-config");
const tables = require('../model/table');

class FindPostCommentView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_find_post_comments}`;
    }
}

module.exports = FindPostCommentView;