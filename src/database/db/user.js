const User = require("../../database/model/user");

let getExsitingUserDetails = async (email, phone) =>
{
  return await User.query().select().where('email', email).first();
}

let createUser = async(data) =>
{
    return await User.query().insert(data);
}

let getUserLoginDetails = async (email) => 
{
  return await User.query().select().where({email: email}).first()
}

let getUserDetailsById = async(id) =>
{
  return await User.query().select().where('id', id).withGraphFetched('[image]').first();
}

let updateUser = async (id, data) =>
{
    return await User.query().patchAndFetchById(id, data);
}

let getUserByEmailId = async(email) =>
{
  return await User.query().select().where('email', email).first();
}

module.exports ={
  getExsitingUserDetails : getExsitingUserDetails,
  createUser: createUser,
  getUserLoginDetails: getUserLoginDetails,
  getUserDetailsById: getUserDetailsById,
  updateUser: updateUser,
  getUserByEmailId: getUserByEmailId
}