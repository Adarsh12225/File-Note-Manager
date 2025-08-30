const apiUrl = "http://localhost:5000/api/notes";

// Fetch and display notes
async function fetchNotes() {
  const res = await fetch(apiUrl);
  const notes = await res.json();

  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.setAttribute("data-id", note._id);

    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="enableEdit('${note._id}', '${note.title}', '${note.content}')">Edit</button>
      <button onclick="deleteNote('${note._id}')">Delete</button>
    `;

    notesDiv.appendChild(div);
  });
}

// Add a new note
async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  fetchNotes();
}

// Enable inline editing
function enableEdit(id, oldTitle, oldContent) {
  const noteDiv = document.querySelector(`[data-id='${id}']`);
  noteDiv.innerHTML = `
    <input type="text" id="edit-title-${id}" value="${oldTitle}" autofocus>
    <textarea id="edit-content-${id}">${oldContent}</textarea>
    <button onclick="saveEdit('${id}')">Save</button>
    <button onclick="cancelEdit('${id}', '${oldTitle}', '${oldContent}')">Cancel</button>
  `;

  // Focus automatically on title input
  document.getElementById(`edit-title-${id}`).focus();
}

// Save edited note
async function saveEdit(id) {
  const title = document.getElementById(`edit-title-${id}`).value;
  const content = document.getElementById(`edit-content-${id}`).value;

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  fetchNotes();
}

// Cancel edit (restore old data)
function cancelEdit(id, oldTitle, oldContent) {
  const noteDiv = document.querySelector(`[data-id='${id}']`);
  noteDiv.innerHTML = `
    <h3>${oldTitle}</h3>
    <p>${oldContent}</p>
    <button onclick="enableEdit('${id}', '${oldTitle}', '${oldContent}')">Edit</button>
    <button onclick="deleteNote('${id}')">Delete</button>
  `;
}

// Delete a note
async function deleteNote(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchNotes();
}

// Initial load
fetchNotes();
