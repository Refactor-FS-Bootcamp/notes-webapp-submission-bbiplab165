// Get the elements we'll be working with
const titleInput = document.getElementById("title");
const noteInput = document.getElementById("note");
const addNoteButton = document.getElementById("addNote");
const notesHeading = document.getElementById("notesHeading");
const notesList = document.getElementById("notesList");

// Check if there are any saved notes in local storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Render the notes list
function renderNotes() {
    // Clear the notes list
    notesList.innerHTML = "";

    // If there are no notes, show a message
    if (notes.length === 0) {
        notesHeading.textContent = "No notes yet";
        return;
    }

    // Otherwise, show the notes
    notesHeading.textContent = "Notes:";
    notes.forEach((note, index) => {
        const noteElement = document.createElement("li");
        noteElement.classList.add("note");

        const deleteNoteButton = document.createElement("button");
        deleteNoteButton.classList.add("deleteNote");
        deleteNoteButton.textContent = "Delete";
        deleteNoteButton.addEventListener("click", () => {
            deleteNote(index);
        });

        const editNoteButton = document.createElement("button");
        editNoteButton.classList.add("editNote");
        editNoteButton.textContent = "Edit";
        editNoteButton.addEventListener("click", () => {
            editNote(index);
        });

        noteElement.innerHTML = `
        <div class="noteTitle">${note.title}</div>
        <div class="noteText">${note.note}</div>
    `;
        noteElement.appendChild(deleteNoteButton);
        noteElement.appendChild(editNoteButton);
        notesList.appendChild(noteElement);
    });
}

// Save the notes to local storage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Add a new note
function addNote() {
    // Get the values from the input fields
    const title = titleInput.value.trim();
    const note = noteInput.value.trim();

    // If the title is empty, don't add the note
    if (title === "") {
        return;
    }

    // Create a new note object
    const newNote = {
        title,
        note,
        date: new Date().toISOString(),
    };

    // Add the new note to the notes array
    notes.push(newNote);

    // Save the notes to local storage
    saveNotes();

    // Clear the input fields
    titleInput.value = "";
    noteInput.value = "";

    // Render the updated notes list
    renderNotes();
}

// Delete a note
function deleteNote(index) {
    // Remove the note from the notes array
    notes.splice(index, 1);

    // Save the notes to local storage
    saveNotes();

    // Render the updated notes list
    renderNotes();
}

// Edit a note
function editNote(index) {
    // Get the note to edit
    const note = notes[index];

    // Set the input field values to the note values
    titleInput.value = note.title;
    noteInput.value = note.note;

    // Delete the note from the notes array
    notes.splice(index, 1);

    // Save the notes to local storage
    saveNotes();

    // Render the updated notes list
    renderNotes();
}

// Add event listeners
addNoteButton.addEventListener("click", addNote);

// Render the initial notes list
renderNotes();
