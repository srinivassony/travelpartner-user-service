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
    chat : 'tp_chat',
    fetch_view_notifiction: 'tp_view_fetch_notification',
    fetch_view_post: 'tp_view_fetch_posts',
    fetch_view_post_comment: 'tp_view_fetch_post_comments',
    findPost : 'tp_find_post',
    findPostLike : 'tp_find_post_like',
    findPostComment : 'tp_find_post_comment',
    fetch_view_find_post: 'tp_view_fetch_find_post',
    fetch_view_find_post_comments: 'tp_view_fetch_find__post_comments',
    findPostSave : 'tp_find_post_save',
    fetch_view_find_saved_posts : 'tp_view_fetch_find_saved_post'
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
