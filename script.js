
const teamContainer = document.getElementById('team-container');
const generateTeamBtn = document.getElementById('generate-team-btn');


async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await response.json();
    return pokemon;
}
async function generateTeam() {
    teamContainer.innerHTML = '';
    const teamPromises = [];

    for (let i = 0; i < 6; i++) {
        teamPromises.push(getRandomPokemon());
    }

    const team = await Promise.all(teamPromises);
    
    team.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p>ID: ${pokemon.id}</p>
        `;
        
        teamContainer.appendChild(pokemonCard);
    });
}


generateTeamBtn.addEventListener('click', generateTeam);
