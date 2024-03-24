const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('../model/table');

class User extends guid(Model)
{
    static get tableName()
    {
        return `${tables.user}`;
    }

    static get relationMappings()
    {
        const Image = require('./image');

        return {
            image: {
                relation: Model.BelongsToOneRelation,
                modelClass: Image,
                join: {
                    from: `${tables.image}.userId`,
                    to: `${tables.user}.id`
                }
            }
        };
    }
}

module.exports = User;