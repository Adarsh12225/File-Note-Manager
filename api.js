const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// serve static UI
app.use(express.static(path.join(__dirname, "public")));

// GET all notes
app.get("/notes", (req, res) => {
  fs.readFile("notes.txt", "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read file" });
    const notes = data ? data.trim().split("\n") : [];
    res.json({ notes });
  });
});

// POST new note
app.post("/notes", (req, res) => {
  const { note } = req.body;
  if (!note) return res.status(400).json({ error: "Note is required" });

  fs.appendFile("notes.txt", note + "\n", (err) => {
    if (err) return res.status(500).json({ error: "Could not save note" });
    res.status(201).json({ message: "Note added", note });
  });
});

app.listen(5000, () => console.log("Express API + UI at http://localhost:5000"));
