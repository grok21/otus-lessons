export function auth(req, res, next) {
  if (!req.cookies.userInfo) {
    return res.redirect('/auth#login')
  }

  if (!req.cookies.userInfo.isAuthenticated) {
    return res.redirect('/auth#login')
  }

  next()
}