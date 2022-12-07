const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
exports.routesConfig = function (app) {

    app.post('/login', [
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/register', [
        VerifyUserMiddleware.hasRegisterValidFields,
        AuthorizationController.register
    ]);
};

