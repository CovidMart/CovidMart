const unauthorized = next => {
  const err = new Error("I can't let you do that, Dave.")
  err.status = 401
  return next(err)
}

const isAdmin = (req, res, next) => {
  console.log('------************------\n Are you an ADMIN, Dave?\n')
  if (!req.session.passport || !req.session.passport.isAdmin) {
    unauthorized(next)
  }
  next()
}

const userLoggedIn = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    const thisUser = req.session.passport.user
    const accessedUser = parseInt(req.params.userId)
    if (accessedUser !== thisUser && !req.session.passport.isAdmin) {
      unauthorized(next)
    }
  } else {
    unauthorized(next)
  }
  next()
}

module.exports = {
  isAdmin,
  userLoggedIn
}
