function saveEntry() {
  const mood = document.getElementById('mood').value;
  const entry = document.getElementById('entry').value.trim();

  if (!entry) {
    alert("Please write something in your journal.");
    return;
  }

  const date = new Date().toLocaleString();
  const newEntry = {
    mood,
    entry,
    date
  };

  let journal = JSON.parse(localStorage.getItem("journalEntries")) || [];
  journal.push(newEntry);
  localStorage.setItem("journalEntries", JSON.stringify(journal));

  document.getElementById('entry').value = '';
  loadEntries();
}

function loadEntries() {
  const journalLog = document.getElementById('journalLog');
  let journal = JSON.parse(localStorage.getItem("journalEntries")) || [];

  journalLog.innerHTML = "";

  journal.reverse().forEach((entry, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.innerHTML = `
      <strong>${entry.date} - ${entry.mood}</strong>
      <p>${entry.entry}</p>
      <button onclick="deleteEntry(${journal.length - 1 - index})">Delete</button>
      <hr>
    `;
    journalLog.appendChild(entryDiv);
  });
}

function deleteEntry(index) {
  let journal = JSON.parse(localStorage.getItem("journalEntries")) || [];
  journal.splice(index, 1);
  localStorage.setItem("journalEntries", JSON.stringify(journal));
  loadEntries();
}

window.onload = loadEntries;
