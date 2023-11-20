// Sample data
const snesGames = [
    { title: 'Super Mario World', genre: 'Action', year: '1991', image: 'SuperMarioWorld.webp' },
    { title: 'Super Mario Kart', genre: 'Racing', year: '1992', image: 'SuperMarioKart.webp' },
    { title: 'EarthBound', genre: 'RPG', year: '1995', image: 'Earthbound.webp' },
    { title: 'Super Mario All Stars', genre: 'Platformer', year: '1993', image: 'SuperMarioAllStars.webp' },
    // Add more SNES games as needed
];

const gbaGames = [
    { title: 'Super Mario Advance 4: Super Mario Bros 3', genre: 'Platformer, Action', year: '2003', image: 'SMD4.webp' },
    { title: 'Pokemon FireRed and LeafGreen', genre: 'RPG', year: '2004', image: 'PokemonFireRed.webp' },
    // Add more Gameboy Advance games as needed
];

// Array to store favorite games
let favoriteGames = [];

// Function to display games
function displayGames(gameLibraryId, games) {
    const gameLibrary = document.getElementById(gameLibraryId);
    gameLibrary.innerHTML = ''; // Clear the game library
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.innerHTML = `
            <img class="game-image" src="${game.image}" alt="${game.title}">
            <h2>${game.title}</h2>
            <p>${game.genre}</p>
            <p>${game.year}</p>
            ${gameLibraryId !== 'favorites' ? '<button onclick="addToFavorites(\'' + game.title + '\')">Add to Favorites</button>' : ''}
            ${gameLibraryId === 'favorites' ? '<button onclick="removeFromFavorites(\'' + game.title + '\')">Remove from Favorites</button>' : ''}
        `;
        gameLibrary.appendChild(gameDiv);
    });
    // Show or hide the favorites title based on whether there are any favorite games
    document.getElementById('favorites-title').style.display = favoriteGames.length > 0 ? 'block' : 'none';
}

// Function to add game to favorites
function addToFavorites(title) {
    const favoriteGame = snesGames.concat(gbaGames).find(game => game.title === title);
    if (!favoriteGames.find(game => game.title === title)) { // Check if the game is not already in favorites
        favoriteGames.push(favoriteGame); // Add the game to favorites
    }
    displayGames('favorites', favoriteGames); // Display favorite games
}

// Function to remove game from favorites
function removeFromFavorites(title) {
    favoriteGames = favoriteGames.filter(game => game.title !== title); // Remove the game from favorites
    displayGames('favorites', favoriteGames); // Display favorite games
}

// Call displayGames function when the page loads
window.onload = function() {
    displayGames('snes-games', snesGames);
    displayGames('gba-games', gbaGames);
};


function displayGames(gameLibraryId, games) {
    const gameLibrary = document.getElementById(gameLibraryId);
    gameLibrary.innerHTML = ''; // Clear the game library

    // Create a new div for the section header
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = `<h1>${gameLibraryId.toUpperCase().replace('-', ' ')}</h1>`;
    gameLibrary.appendChild(headerDiv);

    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.innerHTML = `
            <img class="game-image" src="${game.image}" alt="${game.title}">
            <h2>${game.title}</h2>
            <p>${game.genre}</p>
            <p>${game.year}</p>
            ${gameLibraryId !== 'favorites' ? '<button onclick="addToFavorites(\'' + game.title + '\')">Add to Favorites</button>' : ''}
            ${gameLibraryId === 'favorites' ? '<button onclick="removeFromFavorites(\'' + game.title + '\')">Remove from Favorites</button>' : ''}
        `;
        gameLibrary.appendChild(gameDiv);
    });
    // Show or hide the favorites title based on whether there are any favorite games
    document.getElementById('favorites-title').style.display = favoriteGames.length > 0 ? 'block' : 'none';
}



