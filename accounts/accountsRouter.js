const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .first()
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;
  db("accounts")
    .insert(accountData, "id")
    .then((ids) => {
      const id = ids[0];
      db("accounts")
        .where({ id })
        .first()
        .then((account) => {
          res.status(201).json({ data: account });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.patch("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({
          message: `The update to the account with ID ${id} was successful.`,
        });
      } else {
        res.status(404).json({
          message: "The account with the specified ID does not exist.",
        });
      }
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(changes)
    .then((account) => {
      if (account) {
        res.status(200).json({
          message: `The account with an ID of ${id} has successffully been updated.`,
        });
      } else {
        res.status(404).json({
          message: "There is no account associated with the specified ID.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .del()
    .then((account) => {
      res.status(200).json({
        message: `The account with ID ${id} has successfully been deleted.`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
