const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req,res,next) {
    const userUId = req.cookies?.sessionId;
    if(!userUId) {
        return res.redirect("/login");
    }
const user = getUser(userUId);
if(!user) { 
    return res.redirect("/login");}
    req.user = user;
    next();
}

async function checkAuth(req,res,next){
    const userUId = req.cookies?.sessionId;
    
    const user = getUser(userUId);

    req.user = user;
    next();
}
module.exports = {restrictToLoggedInUser,checkAuth};