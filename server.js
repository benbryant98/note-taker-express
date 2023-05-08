const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);