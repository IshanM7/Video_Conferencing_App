const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('hello');
    const authHeader = req.get('Authorization');    
    if(!authHeader){
        console.log('noHeader');
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }    
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'secretfortoken');
    } catch(err) {
        console.log('hi');
        err.statusCode = 500;
        throw error;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.isLogedIn = true;
    req.id = decodedToken.id;
    req.email = decodedToken.email;
    next();
}