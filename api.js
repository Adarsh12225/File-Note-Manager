const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/noteManager")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// Schema & Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model("Note", noteSchema);

// Routes
// Get all notes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add new note
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.json(newNote);
});

// Update note
app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  res.json(updatedNote);
});

// Delete note
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
