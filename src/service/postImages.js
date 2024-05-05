const db = require('../database/db/postImages');
const common = require('../utils/utils');
const Status = common.Status;
const fs = require("fs");
const path = require("path");
const config = require('../../config');

exports.createPostImage = async (reqParams, file) =>
{
    try
    {
        let uuid = common.uuid();

        const currentPath = path.join(config.gallery_files, file.filename);
        const newPath = path.join(config.gallery_files, uuid);

        if (!fs.existsSync(newPath))
        {
            fs.mkdirSync(newPath);
        }

        const filePath = path.join(newPath, file.filename);

        fs.renameSync(currentPath, filePath);

        console.log('currentPath',currentPath)
        console.log('newPath',newPath)

        var params = {
            postFieldId: uuid,
            postFileName: file.filename,
            createdAt: new Date(),
            createdBy: reqParams.uuid
        }

        let postImage= await db.createPostImage(params);

        return postImage
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}