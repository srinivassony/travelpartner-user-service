const config = require('../../config');
const db = require('../database/db/image');
const common = require('../utils/utils');
const Status = common.Status;
const fs = require("fs");
const path = require("path");

exports.createProfilePicImage = async (file, reqParams) =>
{
    try
    {
        let documentData = await db.getProfilePicImage(reqParams.userId);

        let profilePic = null;

        if(!documentData)
        {
            let uuid = common.uuid();

            const currentPath = path.join(config.upload_files, file.filename);
            const newPath = path.join(config.upload_files, uuid);
    
            if (!fs.existsSync(newPath))
            {
                fs.mkdirSync(newPath);
            }
    
            const filePath = path.join(newPath, file.filename);
    
            fs.renameSync(currentPath, filePath);
    
            var params = {
                profilePicId: uuid,
                profilePicName: file.filename,
                path: file.path,
                userId: reqParams.userId,
                createdAt: new Date(),
                createdBy: reqParams.uuid
            }
    
            profilePic = await db.createProfilePicImage(params);

            return {
                status: Status.SUCCESS,
                profilePic: profilePic
            }
        }
        else
        {
            const pathToFile = config.upload_files + documentData.profilePicId + '/' + documentData.profilePicName;

            if (fs.existsSync(pathToFile))
            {
                fs.unlinkSync(pathToFile)
            }
    
            const currentPath = path.join(config.upload_files, file.filename);
            const newPath = path.join(config.upload_files, documentData.profilePicId);
    
            const filePath = path.join(newPath, file.filename);
    
            fs.renameSync(currentPath, filePath);
    
            let updatedParams = {
                profilePicName: file.filename,
                path: file.path,
                userId: reqParams.userId,
                updatedAt: new Date(),
                updatedBy: reqParams.uuid
            };

            profilePic = await db.updateProfilePic(documentData.id, updatedParams);

            return {
                status: Status.SUCCESS,
                profilePic: profilePic
            }
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