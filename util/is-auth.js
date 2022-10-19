module.exports = (request, response, next) => {
    if (!request.session.isLoggedIN) {
        return response.redirect('/user/login');
    }
    next();
}