// Sample data
const gameLibraries = {
    'snes-games': [
        { title: 'Super Mario World', genre: 'Action', year: '1991', image: 'SuperMarioWorld.webp', summary: "Having returned peace to Mushroom World, Mario and Luigi decide to take a leisurely vacation with Princess Peach. They set out for Yoshi’s Island in the magical island nation of Dinosaur Land far to the south. But soon after arriving on the island, Princess Peach suddenly disappears. As Mario and Luigi desperately search for her, they discover a strange egg on the outskirts of the island. Then, before their very eyes, an odd little dragon hatches! The dragon calls himself Yoshi and says, \"Monstrous turtles recently appeared here in this Dinosaur Land. They have used magic to seal my friends inside eggs. I tried to help them, but the turtles are incredibly strong and cast a spell on me, too… Will you please come with me to rescue my friends?\" What can this mean? Apparently, Bowser hasn’t learned his lesson, so it appears that his minions have yet again kidnapped Princess Peach. Mario and Luigi begin another adventure in hopes of rescuing Yoshi’s pals and Princess Peach!" },
        { title: 'Super Mario Kart', genre: 'Racing', year: '1992', image: 'SuperMarioKart.webp', summary: "Select one of eight characters from the Mario™ series—offering a variety of driving styles—and take on three championship cups in three different kart classes. Win enough, and you'll unlock a fourth circuit: the ultra-tough Special Cup. Crossing the finish line in first place isn't an easy task, though, as each track has unique obstacles to conquer and racers can obtain special power-ups that boost them to victory. For a different kind of challenge, take on a friend in multiplayer races or go head-to-head in the Battle Mode arena of your choosing, where the object is to pop your opponent's balloons before you lose your own. With more than 15 tracks to master and nearly endless replay value, Super Mario Kart is classic gaming…with some banana peels thrown in for good measure!" },
        { title: 'EarthBound', genre: 'RPG', year: '1995', image: 'Earthbound.webp', summary:"The player starts as a young boy named Ness as he investigates a nearby meteorite crash with his neighbor, Pokey, to find his neighbor's brother Picky. They find that an alien force, Giygas, has enveloped and consumed the world in hatred and consequently turned animals, humans, and objects into malicious creatures." },
        { title: 'Super Mario All Stars', genre: 'Platformer', year: '1993', image: 'SuperMarioAllStars.webp', summary:"Super Mario All-Stars is a compilation of reissues for the Super Nintendo Entertainment System (the Super Famicom in Japan). It enhances Super Mario Bros., Super Mario Bros. 2, Super Mario Bros. 3, and Super Mario Bros.: The Lost Levels (known as Super Mario Bros." },
        // Add more SNES games as needed
    ],
    'gba-games': [
        { title: 'Super Mario Advance 4 Super Mario Bros 3', genre: 'Platformer, Action', year: '2003', image: 'SMD4.webp', summary:"Strap yourself into the red or green dungarees of Mario or Luigi as they jump, bounce, slide, fly and swim their way across eight enormous worlds. Their mission? To battle the forces of Bowser and his troublemaking kids, who have turned all the local kings into animals. What makes Super Mario Advance 4: Super Mario Bros. 3 so special? Is it the pixel-perfect controls? Could it be the superb level design, packed with secrets and surprises? Or maybe it's the cool power-ups like the flying Tanooki Suit, sea-swimming Frog Suit, or the whirlwind-summoning Warp Whistle? Boasting vastly improved graphics and sounds over the NES original, plus never-before-seen special features, Super Mario Advance 4: Super Mario Bros. 3 will give everyone a chance to relive - or experience anew - this classic game." },
        { title: 'Pokemon FireRed and LeafGreen', genre: 'RPG', year: '2004', image: 'PokemonFireRed.webp', summary:"Travel through Kanto, battling, capturing and training wild Pokémon as well as tackling other trainers, and the evil Team Rocket. Between catching the 200 Pokémon, including 10 unique to Pokémon FireRed, visit one of the eight gyms in an attempt to prove your worth and become a Pokémon Master. With the Nintendo Game Boy Advance Link Cable one can battle friends in two-on-two matches, with a variety of configurable options that are sure to provide many hours of fun. Plus, there's another set of multiplayer features that we can't announce just yet..." },
        // Add more Gameboy Advance games as needed
    ],
    'favorites': []
};

// Function to display games
function displayGames(gameLibraryId) {
    const gameLibrary = document.getElementById(gameLibraryId);
    gameLibrary.innerHTML = ''; // Clear the game library

    // Create a new div for the section header
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = `<h1>${gameLibraryId.toUpperCase().replace('-', ' ')}</h1>`;
    gameLibrary.appendChild(headerDiv);

    gameLibraries[gameLibraryId].forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.innerHTML = `
            <img class="game-image" src="${game.image}" alt="${game.title}">
            <h2>${game.title}</h2>
            <p>${game.genre}</p>
            <p>${game.year}</p>
            ${gameLibraryId !== 'favorites' ? '<button onclick="addToFavorites(\'' + game.title + '\')">Add to Favorites</button><button onclick="showGameSummary(\'' + game.title + '\', this)">Game Summary</button><div id="summary-' + game.title.replace(/\s+/g, '-') + '" class="summary"></div>' : ''}
            ${gameLibraryId === 'favorites' ? '<button onclick="removeFromFavorites(\'' + game.title + '\')">Remove from Favorites</button>' : ''}
        `;
        gameLibrary.appendChild(gameDiv);
    });
    
    // Show or hide the favorites title based on whether there are any favorite games
    document.getElementById('favorites-title').style.display = gameLibraries['favorites'].length > 0 ? 'block' : 'none';
}

// Function to add game to favorites
function addToFavorites(title) {
    const favoriteGame = [...gameLibraries['snes-games'], ...gameLibraries['gba-games']].find(game => game.title === title);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(game => game.title === title)) { // Check if the game is not already in favorites
        favorites.push(favoriteGame); // Add the game to favorites
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Save favorites to local storage
    }
    displayGames('favorites'); // Display favorite games
}

// Function to remove game from favorites
function removeFromFavorites(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(game => game.title !== title); // Remove the game from favorites
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Update favorites in local storage
    displayGames('favorites'); // Display favorite games
}

// Function to show game summary
function showGameSummary(title, button) {
    const game = [...gameLibraries['snes-games'], ...gameLibraries['gba-games']].find(game => game.title === title); // Find the game by title
    const summaryDiv = document.getElementById('summary-' + title.replace(/\s+/g, '-')); // Get the div element by id

    // Check if the summary is currently visible
    if (summaryDiv.style.display === 'block') {
        summaryDiv.style.display = 'none'; // Hide the summary
    } else {
        summaryDiv.textContent = game.summary; // Set the text content of the div to the game's summary
        summaryDiv.style.display = 'block'; // Show the summary
    }
}


// Call displayGames function when the page loads
window.onload = function() {
    gameLibraries['favorites'] = JSON.parse(localStorage.getItem('favorites')) || [];
    Object.keys(gameLibraries).forEach(displayGames);
};

// Function to add game to favorites and update the display in real-time
function addToFavorites(title) {
    const favoriteGame = [...gameLibraries['snes-games'], ...gameLibraries['gba-games']].find(game => game.title === title);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(game => game.title === title)) { // Check if the game is not already in favorites
        favorites.push(favoriteGame); // Add the game to favorites
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Save favorites to local storage
        gameLibraries['favorites'].push(favoriteGame); // Update the in-memory favorites
        displayGames('favorites'); // Display favorite games
    }
}

// Function to remove game from favorites and update the display in real-time
function removeFromFavorites(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(game => game.title !== title); // Remove the game from favorites
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Update favorites in local storage
    gameLibraries['favorites'] = favorites; // Update the in-memory favorites
    displayGames('favorites'); // Display favorite games
}
