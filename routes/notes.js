const note = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

note.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

note.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback.");
  }
});

note.delete("/:id", (req, res) => {
  const { id } = req.body;

  readFromFile("./db/db.json").then((data) => {
    const i = data.findIndex((note) => note.id === id);
    const updatedData = JSON.parse(data).splice(i, 1);
    writeToFile("./db/db.json", updatedData);
  });
  res.send("Deleted note.");
});

module.exports = note;
