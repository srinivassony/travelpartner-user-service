const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class FindPostLike extends guid(Model)
{
    static get tableName()
    {
        return `${tables.findPostLike}`;
    }
}

module.exports = FindPostLike;