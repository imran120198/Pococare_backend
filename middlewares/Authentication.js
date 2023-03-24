const jwt=require('jsonwebtoken');

const authentication=(req,res,next)=>{
    if(!req.headers.authorization){
        res.send('Please Login')
    }
    var token=req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'abcdegfh', function(err, decoded) {
        if(err){
            res.send('Please login again')
        }else{
            req.body.userId=decoded.userId
            next()
        }
      });
}

module.exports={
    authentication
}