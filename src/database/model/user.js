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
        const Gallery = require('./gallery');


        return {
            image: {
                relation: Model.BelongsToOneRelation,
                modelClass: Image,
                join: {
                    from: `${tables.image}.userId`,
                    to: `${tables.user}.id`
                }
            },
            gallerys: {
                relation: Model.HasManyRelation,
                modelClass: Gallery,
                join: {
                    from: `${tables.gallery}.userId`,
                    to: `${tables.user}.id`
                }
            }
        };
    }
}

module.exports = User;