const config = require('../../../config');

const tables = {
    user: 'tp_user',
    image: 'tp_image',
    gallery: 'tp_gallery',
    findPartner: 'tp_findAPartner',
    followUsers: 'tp_follow_users',
    notification : 'tp_notification',
    post : 'tp_post',
    postComment : 'tp_post_comment',
    postImages : 'tp_post_images',
    postLike : 'tp_post_like',
    fetch_view_notifiction: 'tp_view_fetch_notification',
    fetch_view_post: 'tp_view_fetch_posts',
    fetch_view_post_comment: 'tp_view_fetch_post_comments',
    findPost : 'tp_find_post'

};

const rdsPrefix = config.rdsSql.owner;
const dbServer = config.dbServer || "COMMON";

if (rdsPrefix && dbServer === "COMMON")
{
    Object.keys(tables).forEach((key) =>
    {
        tables[key] = `${rdsPrefix}${tables[key]}`;
    });
}

module.exports = tables;
