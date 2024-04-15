const config = require('../../../config');

const tables = {
    user: 'tp_user',
    image: 'tp_image',
    gallery: 'tp_gallery',
    findPartner: 'tp_findAPartner',
    followUsers: 'tp_follow_users',
    notification : 'tp_notification',
    fetch_view_notifiction: 'tp_view_fetch_notification'
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
