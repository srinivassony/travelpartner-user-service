const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class Gallery extends guid(Model)
{
    static get tableName()
    {
        return `${tables.gallery}`;
    }
}

module.exports = Gallery;