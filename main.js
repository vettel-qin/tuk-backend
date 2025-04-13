const app = require("./app");

const { SERVER_PORT, SERVER_HOST } = require("./config");

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
