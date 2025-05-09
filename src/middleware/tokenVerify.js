const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' })
    }

    req.user = decoded
    next()
  })
}

module.exports = verifyToken
