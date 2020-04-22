const isAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(401).send()
  }
  next() // need to continue through express middleware
}

module.exports = isAdmin
