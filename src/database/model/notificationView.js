const { Model } = require("../db/db-config");
const tables = require('../model/table');

class NotificationView extends Model
{
    static get tableName()
    {
        return `${tables.fetch_view_notifiction}`;
    }
}

module.exports = NotificationView;