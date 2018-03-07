/**
 * @description Serve static file content to the client
 * @param app
 * @param express
 * @param projectRootSrc
 */
module.exports = function (app, express, projectRootSrc) {

    if (process.env.environment === "development") {
        app.use('/client/app', express.static(projectRootSrc + 'client/app/'));
        app.use('/client/libraries', express.static(projectRootSrc + 'client/libraries/'));
    }
    else if (process.env.environment === "test") {
        app.use('/client/app', express.static(projectRootSrc + '/client/liveTest/'));
        app.use('/client/app', express.static(projectRootSrc + '/client/app/'));
        // app.use('/client/app', express.static(projectRootSrc + '/client/app/'));
        // app.use('client/app/index.pug', express.static(projectRootSrc + '/client/app/index.pug'));
    }




    // app.use(express.static(projectRootSrc + 'client/libraries/angular-route/'));
};