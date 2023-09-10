const URL = "https://pokeapi.co/api/v2/pokemon/";
const CONTAINER = document.getElementById('container');
const INPUT = document.getElementById('pokefinder');
const BUTTON = document.getElementById('pokebutton');
let pokemon = {};
let skills = [];
// Función Fetch con URL Pokémon
// Función Fetch con URL Pokémon
function GetPokemons(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                return response.json();
            }
        })
        .then(response => {
            return {
                status: 'ok',
                data: response
            };
        })
        .catch(error => {
            return {
                status: 'error',
                data: error
            };
        });
}

// Impresora de PokeDatos
// Impresora de PokeDatos
function ShowPoke() {
    let HTMLToAppend = '';

    Promise.all(pokemon.abilities.map(ability => {
        return GetPokemons(ability.ability.url)
            .then(result => {
                if (result.status == 'ok') {
                    return result.data;
                } else {
                    throw new Error('Unable to fetch ability data');
                }
            });
    }))
    .then(abilityData => {
        skills = abilityData;

        HTMLToAppend = `
        <div class="basic-info">
            <div>
                <div class="title">Name</div>
                <div class="info">${pokemon.name}</div>
            </div>
            <div>
                <div class="title">ID</div>
                <div class="info">${pokemon.id}</div>
            </div>
            <div>
                <div class="title">Height</div>
                <div class="info">${pokemon.height}</div>
            </div>
            <div>
                <div class="title">Weight</div>
                <div class="info">${pokemon.weight}</div>
            </div>
        </div>
        <div>
            <div class="title">Abilities</div>
            <div class="info"><span>${pokemon.abilities[0].ability.name}:</span> ${skills[0].effect_entries[1].effect}</div>
            <div class="info"><span>${pokemon.abilities[1].ability.name}:</span> ${skills[1].effect_entries[1].effect}</div>
        </div>
        `

        CONTAINER.innerHTML = HTMLToAppend;
    })
    .catch(error => {
        console.error(error);
    });
}


// Escuchador de eventos, chequea y guarda datos en variable constante
BUTTON.addEventListener('click',(e)=>{
    let inputlower = INPUT.value.toLowerCase();
    GetPokemons(URL + inputlower).then(result =>{
        if(result.status == 'ok'){
            pokemon = result.data;
            ShowPoke();
        }
    })
})