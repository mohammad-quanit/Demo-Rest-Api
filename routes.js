const appRoutes = require('express')();

appRoutes.use('/exercises', require('./routes/exercise.route'));
appRoutes.use('/users', require('./routes/user.route'));
appRoutes.use('/chartData', require('./routes/chartData.route'));
appRoutes.use("/logs", require("./routes/logs.route"));

module.exports = appRoutes;