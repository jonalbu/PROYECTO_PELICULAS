// Forzar Google DNS para resolver los hostnames de MongoDB Atlas
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const app = require("./app");
const connectDB = require("./database/connection");

const PORT = process.env.PORT;

// Connect to DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
