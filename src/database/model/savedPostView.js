const { Model } = require("../db/db-config");
const tables = require('../model/table');

class SavedPostView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_find_saved_posts}`;
    }
}

module.exports = SavedPostView;