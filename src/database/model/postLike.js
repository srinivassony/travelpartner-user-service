const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class PostLike extends guid(Model)
{
    static get tableName()
    {
        return `${tables.postLike}`;
    }
}

module.exports = PostLike;