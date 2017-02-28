
module.exports = function (app, express, projectRootSrc) {
    app.use(express.static(projectRootSrc + 'client/app/'));
    app.use(express.static(projectRootSrc + 'client/libraries/'));
    // app.use(express.static(projectRootSrc + 'client/libraries/angular-route/'));
};