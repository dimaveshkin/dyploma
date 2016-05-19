module.exports = function (req, res, next) {
   if(req.session.admin){
        next();
   } else {
       res.status(403).send("403 Not authorized");
   }
};