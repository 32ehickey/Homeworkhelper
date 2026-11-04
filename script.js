const gameGrid = document.getElementById('gameGrid');
const searchBar = document.getElementById('searchBar');
const playerModal = document.getElementById('playerModal');
const gameFrame = document.getElementById('gameFrame');
const closeBtn = document.getElementById('closeBtn');

let allGames = [];

async function loadGames() {
  try {
    const response = await fetch('games.json');
    allGames = await response.json();
    renderGames(allGames);
  } catch (error) {
    console.error('Failed to load games.json:', error);
  }
}

function renderGames(games) {
  gameGrid.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <h3>${game.title}</h3>
      <p>${game.category}</p>
    `;
    card.addEventListener('click', () => openGame(game.url));
    gameGrid.appendChild(card);
  });
}

function openGame(url) {
  gameFrame.src = url;
  playerModal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
  gameFrame.src = '';
  playerModal.classList.add('hidden');
});

searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allGames.filter(g => g.title.toLowerCase().includes(query));
  renderGames(filtered);
});

loadGames();
