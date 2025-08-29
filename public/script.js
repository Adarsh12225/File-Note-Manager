const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

// Fetch notes on page load
async function fetchNotes() {
  const res = await fetch("/notes");
  const data = await res.json();
  renderNotes(data.notes);
}

function renderNotes(notes) {
  notesList.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

// Add new note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const note = noteInput.value.trim();
  if (!note) return;

  await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note })
  });

  noteInput.value = "";
  fetchNotes();
});

// Initial load
fetchNotes();
