require("dotenv").config();
const server = require("./api/server.js");

const db = require("./data/dbConfig");

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  db("products")
    .then((employees) => {
      res.status(200).json(employees);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
