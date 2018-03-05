/**
 * @description Serve static file content to the client
 * @param app
 * @param express
 * @param projectRootSrc
 */
module.exports = function (app, express, projectRootSrc) {
    app.use('/client/app', express.static(projectRootSrc + 'client/app/'));
    app.use('/client/libraries', express.static(projectRootSrc + 'client/libraries/'));



    // app.use(express.static(projectRootSrc + 'client/libraries/angular-route/'));
};