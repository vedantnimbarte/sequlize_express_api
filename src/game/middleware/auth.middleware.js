const JWT = require('jsonwebtoken')

async function signAccessToken(params) {
    try {
        const payload = JSON.parse(params);
        const secret = process.env.ACCESS_TOKEN_SECRET
        // const options = {
        //     expiresIn: '7d',
        //     issuer: 'casino.com',
        //     audience: params
        // }
        var jwtExpiry = await JWT.sign(payload, secret);
        return jwtExpiry;
    } catch (error) {
        return error;
    }
}


async function signRefreshToken(params) {
    try {
        const payload = JSON.parse(params);
        const secret = process.env.REFRESH_TOKEN_SECRET
        // const options = {
        //     expiresIn: '24h',
        //     issuer: 'casino.com',
        //     audience: params
        // }
        var jwtExpiry = JWT.sign(payload, secret);
        return jwtExpiry;
    } catch (error) {
        return error;
    }
}

async function verifyAccessToken(req, res, next) {
    if (req.headers['authorization'] === undefined || null) {
        return res.json({ status: false, msg: "Authorization" })
    }
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    let token = bearerToken[1];
    let secret = process.env.ACCESS_TOKEN_SECRET
    req.payload = JWT.decode(token)
    
    next();

}

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken }