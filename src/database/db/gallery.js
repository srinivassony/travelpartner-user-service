const Gallery = require("../../database/model/gallery");

let createImage = async (data) =>
{
    return await Gallery.query().insert(data);
}

const getImages = async (id) => 
{
    return await Gallery.query().where({ userId: id }).first();
}

module.exports = {
    createImage: createImage,
    getImages: getImages
}