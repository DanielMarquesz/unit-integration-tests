const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

  const token = req.header('auth-token')

  if(!token) {
    res.status(400).json(
      'The token was not provided'
    )
  }

  try {
    const jwtTokenVerify = jwt.verify(token, 'secret')
    req.user = jwtTokenVerify
  } catch (error) {
    res.status(400).json(
      'Are u trolling me?'
    )
  }

  next()
}

module.exports = verifyToken