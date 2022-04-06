'use strict'

const pesquisarPoke = () =>{

    const getPokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i =1; i<=386; i++){
        pokemonPromises.push(fetch(getPokemonurl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
    .then(pokemons => {
        const lisPokemons = pokemons.reduce((accumulator ,pokemon) => {

            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator += 
            `<div class="card">
                <div class ="img">
                <img class ="card-image ${types[0]}" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                </div>
                <div class ="atributos">
                <p class="card-title">${pokemon.id}</p>
                <p class="card-name">${pokemon.name}</p>
                <p class="card-subtitle">${types.join(' | ')}</p>
                </div>
                
            </div>`
            return accumulator
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]')
       
        ul.innerHTML = lisPokemons
    })
}

pesquisarPoke()