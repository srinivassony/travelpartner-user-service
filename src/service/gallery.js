const config = require('../../config');
const db = require('../database/db/gallery');
const common = require('../utils/utils');
const Status = common.Status;
const fs = require("fs");
const path = require("path");

exports.createImage = async (req, res) =>
{
    try
    {
        let file = req.file;
        let reqParams = req.body;

        let uuid = common.uuid();

        const currentPath = path.join(config.gallery_files, file.filename);
        const newPath = path.join(config.gallery_files, uuid);

        if (!fs.existsSync(newPath))
        {
            fs.mkdirSync(newPath);
        }

        const filePath = path.join(newPath, file.filename);

        fs.renameSync(currentPath, filePath);

        var params = {
            imageId: uuid,
            fileName: file.filename,
            userId: reqParams.userId,
            createdAt: new Date(),
            createdBy: reqParams.uuid
        }

        let profilePic = await db.createImage(params);

        req.flash('success', 'User photos uploaded!');
        
        res.redirect('/user-profile');

    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/user-profile');
    }
}