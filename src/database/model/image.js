const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class Image extends guid(Model)
{
    static get tableName()
    {
        return `${tables.image}`;
    }
}

module.exports = Image;