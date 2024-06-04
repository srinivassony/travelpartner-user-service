const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class FindPostComment extends guid(Model)
{
    static get tableName()
    {
        return `${tables.findPostComment}`;
    }
}

module.exports = FindPostComment;