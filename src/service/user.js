const db = require('../database/db/user');
const common = require('../utils/utils');
const Status = common.Status;


let userDetails = async() =>
{
  try{
    
    let user = await db.getUserDetails();

    console.log('user', user);

    return{
      status : Status.SUCCESS,
      data : {
        user : user
      }
    }
  }catch(error)
  {
    return{
     status : Status.FAIL,
     message : error.mesage
    }
  }
}


module.exports = {
  userDetails : userDetails
}