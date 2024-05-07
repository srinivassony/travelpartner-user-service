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
        const FollowUsers = require('./follow-users');
        const Notification = require('./notification');

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
            },
            followUsers: {
                relation: Model.HasManyRelation,
                modelClass: FollowUsers,
                join: {
                    from: `${tables.followUsers}.followingId`,
                    to: `${tables.user}.id`
                }
            },
            notifications: {
                relation: Model.HasManyRelation,
                modelClass: Notification,
                join: {
                    from: `${tables.notification}.userId`,
                    to: `${tables.user}.id`
                }
            }
        };
    }
}

module.exports = User;