const AppRoutes = require("express")();

AppRoutes.use(require("./Modules/home/controller"));                  // main home route/endpoint
AppRoutes.use("/logs", require("./Modules/logs"));                    // logs saveapi endpoint
AppRoutes.use("/tmp", require("./Modules/uploads"));                  // img upload

AppRoutes.use("/users", require("./Modules/users/controller"));       // User Authentication routes/endpoints
AppRoutes.use("/todos", require("./Modules/todos/controllers"));      // todos routes endpoint / route

AppRoutes.use("/conversations", require("./Modules/Chat/controller")) // conversations 
  
// AppRoutes.use("/conversation/:id", require("./Modules/Chat/controller"))
// AppRoutes.use("/conversation", require("./Modules/Chat/controller"))
// AppRoutes.use("/send-message/:conversationId", require("./Modules/Chat/controller"))
module.exports = AppRoutes;
