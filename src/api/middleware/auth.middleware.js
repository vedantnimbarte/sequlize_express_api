const JWT = require('jsonwebtoken')
const client = require('./../../connection/redis.connection');
const { models } = require('../../database/index');

async function signAccessToken(params) {
  try {
    const payload = {}
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '300000s',
      issuer: 'casino.com',
      audience: params
    }
    console.log("User Name ", params)
    var jwtExpiry = await JWT.sign(payload, secret, options);
    if(jwtExpiry) {
      return jwtExpiry;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}


async function signRefreshToken(params) {
  try {
    const payload = {}
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '300000s',
      issuer: 'casino.com',
      audience: params
    }
    console.log("User Name ", params)
    var jwtExpiry = await JWT.sign(payload, secret, options);
    if(jwtExpiry) {
      return jwtExpiry;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}


async function verifyAccessToken(req, res, next) {
  console.log(req.headers['authorization'])
  if (!req.headers['authorization']) {
    return res.json({ status: false, msg: "Authorization" })
  }
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return res.json({ status: false, msg: message });
    }
    req.payload = payload
    next();
  })
}

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken }

























// module.exports = {
//   signAccessToken: (username) => {
//     return new Promise((resolve, reject) => {
//       const payload = {}
//       const secret = process.env.ACCESS_TOKEN_SECRET
//       const options = {
//         expiresIn: '300000s',
//         issuer: 'casino.com',
//         audience: username
//       }
//       console.log("User Name ", username)
//       JWT.sign(payload, secret, options, (err, token) => {
//         if (err) {
//           console.log("Err ", err)
//           reject(err)

//           return
//         } else {
//           resolve(token)
//         }

//       })
//     })
//   },
//   verifyAccessToken: (req, res, next) => {
//     console.log(req.headers['authorization'])
//     if (!req.headers['authorization']) {
//       return res.json({ status: false, msg: "Authorization" })
//     }
//     const authHeader = req.headers['authorization'];
//     const bearerToken = authHeader.split(' ');
//     const token = bearerToken[1];
//     JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//       if (err) {
//         const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
//         return res.json({ status: false, msg: message });
//       }
//       req.payload = payload
//       next();
//     })
//   },
//   signRefreshToken: (username) => {
//     return new Promise( async (resolve, reject) => {
//       const payload = {}
//       const secret = process.env.REFRESH_TOKEN_SECRET
//       const options = {
//         expiresIn: '300000s',
//         issuer: 'casino.com',
//         audience: username,
//       }
//       console.log("Refre Name ", username)
//       JWT.sign(payload, secret, options, (err, token) => {
//         if (err) {
//           reject(err.message)
//         }
//         console.log("Name ", JSON.parse(username))
//         var email = JSON.parse(username).AGENT_EMAIL;
//         console.log("Email ", email)
//         var updateOne = await models.Agent.update(
//           { REFRESH_TOKEN_SECRET: token },
//           { where: { AGENT_EMAIL: JSON.parse(username).AGENT_EMAIL } }
//         );
//         resolve(token)
       
//       })
//     })
//   },
//   verifyRefreshToken: (refreshToken) => {
//     return new Promise((resolve, reject) => {
//       JWT.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         (err, payload) => {
//           if (err) {
//             return reject(err.message)
//           }
//           const userName = payload.aud;
//           client.GET(userName, (err, result) => {
//             if (err) {
//               reject(err.message)
//               return
//             }
//             if (refreshToken === result) {
//               return resolve(userName);
//             }
//             else {
//               return reject(err)
//             }
//           })
//         }
//       )
//     })
//   },
// }
