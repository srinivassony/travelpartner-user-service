const db = require('../database/db/user');
const bcrypt = require('bcrypt');
const common = require('../utils/utils');
const Status = common.Status;
const htmlTemplate = require('../utils/htmlTemplate');
const smtp = require('../service/smtp');
let emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let phoneValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

exports.createUser = async (req, res) =>
{
    try
    {
        let userName = req.body.userName ? req.body.userName : null;
        let email = req.body.emailInfo ? req.body.emailInfo.toLowerCase() : null;
        let password = req.body.pass ? req.body.pass : null;

        if (!email)
        {
            req.flash('error', 'Email is required.');
        
            res.redirect('/register');

            return "";
        }
        else if (email && !(email.match(emailValidation)))
        {
            req.flash('error', 'Invalid email address');

            res.redirect('/register');

            return "";
        }
        else if (email && email.toString().length > 50)
        {
            req.flash('error', 'Email maximum character limit is 50.');

            res.redirect('/register');

            return "";
        }

        if (!password)
        {
            req.flash('error', 'Password is required.');
        
            res.redirect('/register');

            return "";
        }
        else if (password && password.toString().length > 15)
        {
            req.flash('error', 'Password maximum character limit is 15.');

            res.redirect('/register');

            return "";
        }

        if (!userName)
        {
            req.flash('error', 'userName is required.');
        
            res.redirect('/register');

            return "";
        }
        if(userName.toString().length < 2 )
        {
            req.flash('error', 'userName minimum character limit is 2.');

            res.redirect('/register');

            return "";
        }
        else if (userName && userName.toString().length > 30)
        {
            req.flash('error', 'userName maximum character limit is 30.');

            res.redirect('/register');

            return "";
        }

        let existingUserDetails = await db.getExsitingUserDetails(email);

        if (existingUserDetails && existingUserDetails.status == 0)
        {
            req.flash('error', register.message);

            res.redirect('/register');

            return "";
        }

        if (existingUserDetails) 
        {
            if (existingUserDetails.email == email) 
            {
                req.flash('error', 'User email already exists. Try with different email.');

                res.redirect('/register');

                return "";
            }
        }

        let uuid = common.generateUUID();

        let params = {
            userName: userName.trim(),
            uuid: uuid,
            email: email,
            role: common.userType.USER,
            createdAt: new Date(),
            createdBy: uuid
        }

        const saltRounds = 10; // Adjust the number of salt rounds as needed

        try
        {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            params.password = hashedPassword;
        } 
        catch (error)
        {
            req.flash('error', error);

            res.redirect('/register');

            return "";
        }

        let user = await db.createUser(params);

        try
        {
            var htmlData = {
                name: user.userName ? user.userName : '',
                id: user.id ? user.id : null
            };

            let emailSubject = `${user.userName} you are invited to Travel-partner`;
            let emailBody = htmlTemplate.generateUserInvitation(htmlData);

            let userEmailParams = {
                email: user.email,
                subject: emailSubject,
                message: emailBody,
            };

            await smtp.sendEmail(userEmailParams);

        }
        catch (error)
        {
            req.flash('error', error.message);

            res.redirect('/register');

            return "";
        }

        res.redirect('/active-account');
    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/register');

        return "";
    }
}

exports.userLogin = async (req, res) =>
{
    try 
    {
        let email  = req.body.emailInfo ? req.body.emailInfo : null;
        let password = req.body.pass ? req.body.pass: null;

        if (!email)
        {
            req.flash('error', 'Email is required.');
        
            res.redirect('/login');

            return "";
        }
        else if (email && !(email.match(emailValidation)))
        {
            req.flash('error', 'Invalid email address');

            res.redirect('/login');

            return "";
        }
        else if (email && email.length > 50)
        {
            req.flash('error', 'Email maximum character limit is 50.');

            res.redirect('/login');

            return "";
        }

        if (!password)
        {
            req.flash('error', 'password is required.');

            res.redirect('/login');

            return "";
        }

        let user = await db.getUserLoginDetails(email);

        if(user && user.status == 0)
        {
            req.flash('error', user.message);

            res.redirect('/login');

            return "";
        }
        else if (!user) 
        {
            req.flash('error', 'User details not found.');

            res.redirect('/login');

            return "";
        }

        if (user.isRegistered == 0 || user.isInvited == 0 || user.inviteOn == null) 
        {
            req.flash('error', 'User login failed. Try to activate your account');

            res.redirect('/active-account');

            return "";
        }

        try
        {
            let byCryptingPassword = await bcrypt.compare(password, user.password);

            console.log('byCryptingPassword',byCryptingPassword)

            if (!byCryptingPassword)
            {
                req.flash('error', 'Password does not match.');

                res.redirect('/login');

                return "";
            }
        }
        catch (error)
        {
            req.flash('error', error);

            res.redirect('/login');

            return "";
        }

        let params = {
            login: 1,
            logout: 0,
            loginUpdatedAt: new Date()
        }

        let userInfo = await db.updateUser(user.id, params);

        req.session.isLoggedIn = true;
        req.session.name = user.userName;
        req.session.userId = user.id;
        req.session.uuid =  user.uuid;
        req.session.profilePicId =  userInfo && userInfo.image && userInfo.image.profilePicId ? userInfo.image.profilePicId : null;
        req.session.profilePicName =  userInfo && userInfo.image && userInfo.image.profilePicName ? userInfo.image.profilePicName : null;
        req.session.save();

        res.redirect('/dashboard');
       
    }
    catch (error) 
    {
        req.flash('error', error);

        res.redirect('/login');

        return "";
    }
}

exports.InviteUser = async (req, res) =>
{   
    try
    {
        let userId = req.params.id ? req.params.id : null;

        if (!userId)
        {
            req.flash('error', 'User id is requried.');

            res.redirect('/active-account');

            return "";
        }

        let userDetails = await db.getUserDetailsById(userId);

        if (!userDetails)
        {
            req.flash('error', 'User not found.');

            res.redirect('/active-account');

            return "";
        }

        let params = {
            isRegistered: 1,
            isInvited: 1,
            inviteOn: new Date(),
            updatedAt: new Date(),
            updatedBy: userDetails.uuid
        }

        let updateUser = await db.updateUser(userId, params);

        res.redirect('/login');
    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/login');

        return "";
    }
}

exports.reSendInviteUser = async (req, res) =>
{
    try
    {
        let email = req.body.email ? req.body.email : null;

        if (!email)
        {
            req.flash('error', 'Email is required.');

            res.redirect('/active-account');

            return "";
        }

        let userDetails = await db.getUserByEmailId(email);

        if (!userDetails)
        {
            req.flash('error', 'There is no user with such email.');

            res.redirect('/active-account');

            return "";
        }

        var htmlData = {
            name: userDetails.userName ? userDetails.userName : '',
            id: userDetails.id ? userDetails.id : null
        };

        let emailSubject = `${userDetails.userName} you are invited to SaiKotiOnline`;
        let emailBody = htmlTemplate.generateUserInvitation(htmlData);

        let userEmailParams = {
            email: userDetails.email,
            subject: emailSubject,
            message: emailBody,
        };

        let x = await smtp.sendEmail(userEmailParams);

        req.flash('success', 'Invitation email is sent to your email address');

        res.redirect('/active-account');

        return "";
    }
    catch (error)
    {
        req.flash('error', error);

        res.redirect('/active-account');

        return "";
    }
}

exports.resetPassword = async (req, res) =>
{
    try 
    {
        let email = req.body.email ? req.body.email : null;

        if (!email)
        {
            req.flash('error', 'Email is requried.');

            res.redirect('/reset-password');

            return "";
        }

        let user = await db.getUserByEmailId(email);

        if (!user)
         {
            req.flash('error', 'There is no user with such email.');

            res.redirect('/reset-password');

            return "";
        }

        try
        {
            var htmlData = {
                name: user.userName ? user.userName : '',
                id: user.id ? user.id : null,
                email: user.email
            };

            let emailSubject = `Password reset for Travel-partner`;
            let emailBody = htmlTemplate.generateResetPassword(htmlData);

            let userEmailParams = {
                email: user.email,
                subject: emailSubject,
                message: emailBody,
            };

            let x = await smtp.sendEmail(userEmailParams);

        }
        catch (error)
        {
            req.flash('error', error.message);

            res.redirect('/reset-password');

            return "";
        }

        req.flash('success', 'Reset password email is sent to your email address');

        res.redirect('/reset-password');

        return "";
    } 
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/reset-password');

        return "";
    }
}

exports.changePassword = async (req, res) =>
{
    try 
    {
        let email = req.body.email ? req.body.email : null;

        let password = req.body.pass ? req.body.pass : null;

        if (!email)
        {
            req.flash('error', 'Email is requried.');

            res.redirect('/change-password');

            return "";
        }

        if (!password)
        {
            req.flash('error', 'Password is requried.');

            res.redirect('/change-password');

            return "";
        }

        let user = await db.getUserByEmailId(email);

        if (!user)
         {
            req.flash('error', 'There is no user with such email.');

            res.redirect('/change-password');

            return "";
        }

        if (user.isRegistered == 0 || user.isInvited == 0 || user.inviteOn == null) 
        {
            req.flash('error', 'User login failed. Try to activate your account');

            res.redirect('/change-password');

            return "";
        }

        let params = {
            updatedAt : new Date(),
            updatedBy: user.uuid
        }

        const saltRounds = 10; // Adjust the number of salt rounds as needed

        try
        {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            params.password = hashedPassword;
        } 
        catch (error)
        {
            req.flash('error', error.message);

            res.redirect('/change-password');

            return "";
        }

        await db.updateUser(user.id, params);

        req.flash('success', 'Password was changed successfuly.');

        res.redirect('/login');

        return "";
    } 
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/change/password');

        return "";
    }
}

exports.getUserById = async (reqParams, req, res) =>
{
    try
    {
        let userId = reqParams.id ? reqParams.id : null;

        if (!userId)
        {
            req.flash('error', 'User id is required.');

            res.redirect('/user-profile');

            return "";
        }

        let userDetails = await db.getUserDetailsById(userId);

        if (!userDetails)
        {
            req.flash('error', 'User details not found!');

            res.redirect('/user-profile');

            return "";
        }

        let NotificationView = await db.getNotificationDetails(userId);

        return {
            status: Status.SUCCESS,
            userDetails: userDetails,
            NotificationView: NotificationView
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

exports.updateUser = async (req, res) =>
{
    try
    {
        let userName = req.body.userName ? req.body.userName : null;
        let email = req.body.emailInfo ? req.body.emailInfo.toLowerCase() : null;
        let phone = req.body.phone ? req.body.phone : null;
        let dob = req.body.dob ? req.body.dob : null;
        let country = req.body.country ? req.body.country : null;
        let state = req.body.state ? req.body.state : null;
        let gender = req.body.gender ? req.body.gender : null;
        let uuid = req.body.uuid ? req.body.uuid : null;
        let id = req.body.userId ? req.body.userId : null;


        if (!email)
        {
            req.flash('error', 'Email is required.');
        
            res.redirect('/user-profile');

            return "";
        }
        else if (email && !(email.match(emailValidation)))
        {
            req.flash('error', 'Invalid email address');

            res.redirect('/user-profile');

            return "";
        }
        else if (email && email.toString().length > 50)
        {
            req.flash('error', 'Email maximum character limit is 50.');

            res.redirect('/user-profile');

            return "";
        }

        if (phone && !(phone.match(phoneValidation)))
        {
            req.flash('error', 'Invalid phone number');

            res.redirect('/user-profile');

            return "";
        }

        if (!userName)
        {
            req.flash('error', 'userName is required.');
        
            res.redirect('/user-profile');

            return "";
        }
        if(userName.toString().length < 2 )
        {
            req.flash('error', 'userName minimum character limit is 2.');

            res.redirect('/user-profile');

            return "";
        }
        else if (userName && userName.toString().length > 30)
        {
            req.flash('error', 'userName maximum character limit is 30.');

            res.redirect('/user-profile');

            return "";
        }

        let params = {
            userName: userName,
            email: email,
            phone: phone,
            dob: dob,
            country: country,
            state: state,
            gender: gender,
            updatedAt: new Date(),
            updatedBy: uuid
        }

        let updateUser = await db.updateUser(id, params);

        if(!updateUser)
        {
            req.flash('error', 'User Profile not updated');
        
            res.redirect('/user-profile');
        }

        req.flash('success', 'User Profile updated successfully');
        
        res.redirect('/user-profile');
    }
    catch (error) 
    {
        req.flash('error', error.message);

        res.redirect('/user-profile');

        return "";
    }
}

exports.getUserDetails = async (id) =>
{
    try
    {
        let userDetails = await db.getUserDetails(id);

        for(let users = 0;users<userDetails.length;users++)
        {
            let user =userDetails[users];

            user.mainUserId = id;
        }

        return {
            status: Status.SUCCESS,
            userDetails: userDetails
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