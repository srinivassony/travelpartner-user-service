const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class FindPostSave extends guid(Model)
{
    static get tableName()
    {
        return `${tables.findPostSave}`;
    }
}

module.exports = FindPostSave;