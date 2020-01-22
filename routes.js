const appRoutes = require('express')();

// main home route/endpoint
// appRoutes.use(require('./home/controller'));

// User Authentication routes/endpoints
appRoutes.use('/users', require('./users/controller'));

// todos routes endpoint / route
appRoutes.use('/todos', require('./todos/controllers'));

// appRoutes.use("/logs", require("./routes/logs.route"));

module.exports = appRoutes;
