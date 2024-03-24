const Image = require("../../database/model/image");

let createProfilePicImage = async (data) =>
{
    return await Image.query().insert(data);
}

const getProfilePicImage = async (id) => 
{
    return await Image.query().where({ userId: id }).first();
}

const updateProfilePic = async (id, data) => 
{
    return await Image.query().patchAndFetchById(id, data);
}

module.exports = {
    createProfilePicImage: createProfilePicImage,
    getProfilePicImage:getProfilePicImage,
    updateProfilePic:updateProfilePic
}