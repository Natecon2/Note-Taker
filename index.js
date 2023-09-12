// index.js
document.addEventListener('DOMContentLoaded', () => {
    const noteTitle = document.querySelector('.note-title');
    const noteTextarea = document.querySelector('.note-textarea');
    const saveNoteButton = document.querySelector('.save-note');
    const newNoteButton = document.querySelector('.new-note');
    const noteList = document.querySelector('.list-group');
  
    // Function to fetch notes from the server and display them
    const fetchNotes = async () => {
      const response = await fetch('/api/notes');
      const notes = await response.json();
  
      noteList.innerHTML = '';
  
      notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = note.title;
        listItem.dataset.id = note.id;
        noteList.appendChild(listItem);
      });
    };
  
    // Function to handle saving a new note
    const saveNote = async () => {
      const title = noteTitle.value.trim();
      const text = noteTextarea.value.trim();
  
      if (title && text) {
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, text })
        });
  
        if (response.ok) {
          fetchNotes();
          noteTitle.value = '';
          noteTextarea.value = '';
        }
      }
    };
  
    // Event listeners
    saveNoteButton.addEventListener('click', saveNote);
    newNoteButton.addEventListener('click', () => {
      noteTitle.value = '';
      noteTextarea.value = '';
    });
  
    // Initial fetch of notes
    fetchNotes();
  });