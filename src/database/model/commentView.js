const { Model } = require("../db/db-config");
const tables = require('../model/table');

class CommentView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_post_comment}`;
    }
}

module.exports = CommentView;