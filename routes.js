const appRoutes = require('express')();

// main home route/endpoint
appRoutes.use(require("./Modules/home/controller"));

// User Authentication routes/endpoints
appRoutes.use('/users', require('./Modules/users/controller'));

// todos routes endpoint / route
appRoutes.use('/todos', require('./Modules/todos/controllers'));

// logs saveapi endpoint
appRoutes.use("/logs", require("./Modules/logs"));

// img upload
appRoutes.use("/tmp", require("./Modules/uploads"));

module.exports = appRoutes;
