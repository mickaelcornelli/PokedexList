import "./Home.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [pokemonType, setPokemonType] = useState([]); // Type de pokemon
  const [firstGenerationOfPokemon, setFirstGenerationOfPokemon] = useState([]); // Pokemon saison 1

  // Au lancement de l'appli
  useEffect(() => {
    //Chargement des types de pokemons
    axios.get("https://pokeapi.co/api/v2/type/").then((res) => {
      if (res.status === 200) {
        setPokemonType(res.data.results);
      }
    });

    // Chargement des 151 premiers pokemon ( première génération )
    let pokeTemp = [];
    for (let index = 1; index < 153; index++) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((res) => {
        if (res.status === 200) {
          pokeTemp.push(res.data);
          setFirstGenerationOfPokemon([...pokeTemp]);
        }
      });
    }
  }, []);

  const loadInformationsFromPokemon = (pokemon) => {
    return (
      <div className="popUp">
          <h2>Abilities :</h2>
        <p>
          {pokemon.abilities.map((ability, index) => {
            return <div key={index}>{ability.name}</div>;
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="home">
      <h1>First generation Pokemon :</h1>
      {firstGenerationOfPokemon.length > 0 ? (
        <div className="pokedex">
          {firstGenerationOfPokemon.map((pokemon, index) => {
            return (
              <div
                key={index}
                className="pokemonCard"
                onClick={() => {
                  //loadInformationsFromPokemon(pokemon);
                }}
              >
                <p>{pokemon.name}</p>
                <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              </div>
            );
          })}
        </div>
      ) : null}
      <h2>Kind of pokemon :</h2>
      <div className="pokedex">
        {pokemonType.map((type, index) => {
          return (
            <div key={index} className="pokemonCard">
              <p>{type.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
