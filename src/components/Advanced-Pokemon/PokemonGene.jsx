import React, { useState } from "react";
import Card from "../Card";
import Navi from "./Nav";
import pokeball from "../../assets/pokeball.mp4";
import pic from "../../assets/pic.png";

const randomNumber = (counts) => {
  return Math.floor(Math.random() * counts) + 1;
};

const AdvancePokemon = () => {
  const [currentPokemon, setCurrentPokemon] = useState("");
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [size, setSize] = useState(8);

  async function getPokemon() {
    setOpening(true);
    setRevealed(false);
    setSize(8);

    try {
      const pokemonIndex = randomNumber(1000);
      setCurrentPokemonIndex(pokemonIndex);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`,
      );
      const pokemon = await response.json();
      setCurrentPokemon(pokemon);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setSize(8);
      setTimeout(() => setSize(160), 100);
    }, 1000);

    setTimeout(() => {
      setOpening(false);
      setRevealed(true);
      setSize(8);
    }, 3000);
  }

  return (
    <div className="bg-red-300">
      <Navi />

      <div className="flex flex-col min-h-screen items-center gap-10 pt-10">
        <div className="relative w-56 h-56">
          <button onClick={getPokemon}>
            {opening ? (
              <video src={pokeball} autoPlay className="w-56 h-46" />
            ) : (
              <img className="w-36 h-36" src={pic} />
            )}
          </button>
          {opening && currentPokemonIndex && (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${currentPokemonIndex}.gif`}
              onError={(e) =>
                (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonIndex}.png`)
              }
              style={{
                width: size,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -70%)",
                transition: "width 1s ease-out",
              }}
            />
          )}
        </div>

        {currentPokemon && currentPokemonIndex && (
          <div className="flex gap-10 justify-center items-center">
            {/* Pokemon Card */}
            <div
              className={`transition-all duration-500 ${revealed ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            >
              <Card
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${currentPokemonIndex}.gif`}
                name={currentPokemon.name}
                type={currentPokemon.types[0].type.name}
                id={currentPokemon.id}
                imgSize="w-40 h-40"
              />
            </div>

            <div
              className={`flex border bg-red-500 text-white border-white py-10 px-2 gap-4 transition-all duration-500 ${revealed ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            >
              <div className="border-2 py-2 px-2">
                <h2 className="font-bold">Stats</h2>
                {currentPokemon.stats.map((s, i) => (
                  <p className="font-semibold" key={i}>
                    {s.stat.name}: {s.base_stat}
                  </p>
                ))}
              </div>

              <div className="border-2 px-2 py-2">
                <h2 className="font-bold">Moves</h2>
                {currentPokemon.moves.slice(0, 4).map((m, i) => (
                  <p className="font-semibold" key={i}>
                    {m.move.name}
                  </p>
                ))}
              </div>

              <div className="border-2 px-2 py-2">
                <h2 className="font-bold">Abilities</h2>
                {currentPokemon.abilities.map((a, i) => (
                  <p className="font-semibold" key={i}>
                    {a.ability.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancePokemon;
