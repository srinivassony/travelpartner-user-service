const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class PostComment extends guid(Model)
{
    static get tableName()
    {
        return `${tables.postComment}`;
    }
}

module.exports = PostComment;