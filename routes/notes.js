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

  const notesData = JSON.parse(readFromFile("./db/db.json"));
  console.log(notesData);
  const i = notesData.findIndex((note) => note.id === id);
  const updatedData = notesData.splice(i, 1);
  writeToFile(updatedData, "./db/db.json");

  res.send("Note deleted successfully!");
});

module.exports = note;
