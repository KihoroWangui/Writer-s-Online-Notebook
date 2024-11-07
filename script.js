const authForm = document.getElementById("auth-form");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const authButton = document.getElementById("auth-button");
const toggleText = document.getElementById("toggle-text");
const message = document.getElementById("message");

let isLogin = false;

// Toggle between Login and Signup modes
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Log In";
    authButton.textContent = "Log In";
    toggleText.innerHTML =
      "Don't have an account? <a href='#' id='toggle-link'>Sign Up</a>";
  } else {
    formTitle.textContent = "Sign Up";
    authButton.textContent = "Sign Up";
    toggleText.innerHTML =
      "Already have an account? <a href='#' id='toggle-link'>Log In</a>";
  }
});

// Handle form submission for login/signup
authForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission from refreshing the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    // Log In Mode
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      message.textContent = "Login successful!";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "index.html"; // Redirect to index.html
      }, 1000);
    } else {
      message.textContent = "Invalid username or password.";
      message.style.color = "red";
    }
  } else {
    // Sign Up Mode
    localStorage.setItem("user", JSON.stringify({ username, password }));
    message.textContent = "Signup successful! Redirecting to login...";
    message.style.color = "green";
    setTimeout(() => {
      isLogin = true;
      formTitle.textContent = "Log In";
      authButton.textContent = "Log In";
      toggleText.innerHTML =
        "Don't have an account? <a href='#' id='toggle-link'>Sign Up</a>";
    }, 1000);
  }
});

// Select elements for notes
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const addNoteButton = document.getElementById("addNoteButton"); // Button to add note

// Load notes from localStorage on page load
window.onload = loadNotes;

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = ""; // Clear the container
  notes.forEach((note, index) => displayNote(note, index));
}

function displayNote(content, index) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("note");
  noteElement.innerHTML = `
        <div class="note-content">${content}</div>
        <button onclick="deleteNote(${index})">Delete</button>
    `;
  notesContainer.appendChild(noteElement);
}

function addNote() {
  const content = noteInput.value.trim();
  if (content) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(content);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNote(content, notes.length - 1);
    noteInput.value = ""; // Clear the input
  }
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1); // Remove note from array
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes(); // Reload notes
}

// Add event listener to the add note button
addNoteButton.addEventListener("click", addNote);
