function authMiddleware(req, res, next) {
  // Check if the user is authenticated
  if (req.session.usuario) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {    
    req.flash("erro", "Você precisa estar logado para acessar esta página.");
    res.redirect('/login');
  }
  
}

module.exports = authMiddleware;
