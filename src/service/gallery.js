const config = require('../../config');
const db = require('../database/db/gallery');
const common = require('../utils/utils');
const Status = common.Status;
const fs = require("fs");
const path = require("path");

exports.createImage = async (file, reqParams) =>
{
    try
    {
        console.log('file', file)
        console.log('reqParams', reqParams)

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
            imageId: uuid,
            fileName: file.filename,
            userId: reqParams.userId,
            createdAt: new Date(),
            createdBy: reqParams.uuid
        }

        let profilePic = await db.createImage(params);

        console.log('profilePic-1', profilePic)

        return {
            status: Status.SUCCESS,
            profilePic: profilePic
        }

    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}