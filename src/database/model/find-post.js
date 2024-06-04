const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class FindPost extends guid(Model)
{
    static get tableName()
    {
        return `${tables.findPost}`;
    }
}

module.exports = FindPost;