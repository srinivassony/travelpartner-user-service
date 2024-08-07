const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class FindPartner extends guid(Model)
{
    static get tableName()
    {
        return `${tables.image}`;
    }
}

module.exports = FindPartner;