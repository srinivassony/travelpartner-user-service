const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class PostImages extends guid(Model)
{
    static get tableName()
    {
        return `${tables.postImages}`;
    }
}

module.exports = PostImages;