import Card from "./Card.jsx";
import { useState, useEffect } from "react";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0",
        );
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getPokemon();
  }, []);

  async function searchPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setPokemon([data]);
  }

  return (
    <div>
      <div>
        <h1>Pokemon Home Page </h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter the pokemon"
        />

        <button onClick={searchPokemon}></button>
      </div>

      <div className="flex gap-16 flex-wrap just-center">
        {pokemon.map((p, index) => (
          <Card
            key={p.name}
            name={p.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
          />
        ))}
      </div>
    </div>
  );
}
