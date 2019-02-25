const { userAPI } = require('../api'),
    path = require('path'),
    { wrapAsync } = require('../infra');

module.exports = app => {

    app.route('/users/login')
        .post(wrapAsync(userAPI.login));

    app.route('/users/signup')
        .post(wrapAsync(userAPI.register)); 
        
    app.route('/users/exists/:userName')
        .get(wrapAsync(userAPI.checkUserNameTaken));
};