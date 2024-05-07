const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class Post extends guid(Model)
{
    static get tableName()
    {
        return `${tables.post}`;
    }
}

module.exports = Post;