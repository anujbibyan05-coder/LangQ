import { db } from '../firebase-config.js';

import {
  collection,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

async function loadResults() {

  const snapshot = await getDocs(collection(db, 'results'));

  const body = document.getElementById('resultsBody');

  snapshot.forEach(doc => {

    const data = doc.data();

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${data.email}</td>
      <td>${data.quizId}</td>
      <td>${data.score}/${data.total}</td>
      <td>${data.attempt}</td>
      <td>${data.createdAt}</td>
    `;

    body.appendChild(row);
  });
}

loadResults();
