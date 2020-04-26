const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  }
}
