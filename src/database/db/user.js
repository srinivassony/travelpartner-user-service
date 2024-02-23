const User = require("../../database/model/user");

let getUserDetails = async () =>
{
  return await User.query().select();
}

module.exports ={
  getUserDetails : getUserDetails
}