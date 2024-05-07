const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class Notification extends guid(Model)
{
    static get tableName()
    {
        return `${tables.notification}`;
    }
}

module.exports = Notification;