import { Link, useNavigate } from "react-router-dom";
import Navi from "./Nav";
import Button from "../Button";
import Card from "../Card";
import Popup from "../Popup";

import { useEffect, useState } from "react";
export default function Index() {
  const [pokedata, setPokedata] = useState([]);
  const [all, setAll] = useState([]);
  const [show, setShow] = useState(false);
  const [indi, setIndi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllPokemon() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0",
      );
      const data = await response.json();
      setAll(data.results);
    }
    getAllPokemon();
  }, []);

  useEffect(() => {
    async function getpokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
        );
        const data = await response.json();

        const detailed = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json())),
        );
        setPokedata(detailed);
      } catch (error) {
        console.log(error);
      }
    }
    getpokemon();
  }, []);

  const sus = (pokemon) => {
    setIndi(pokemon);
    setShow(true);
  };

  return (
    <div className="w-screen h-screen font-sans  ">
      <Navi />

      <div className=" flex w-full h-90 bg-linear-to-r from-red-600 to-red-400">
        <div className="flex-1">
          <div className="ml-30 mt-20">
            <h1 className="text-4xl font-semibold text-white ">
              Your Ultimate
            </h1>
            <h1 className="text-4xl font-semibold text-white ">
              {" "}
              Pokemon Companion
            </h1>
            <br />
            <p className="text-white">
              Explore all 1,025 Pokémon, build your dream team,{" "}
            </p>
            <p className="text-white">and discover your next favourite.</p>
            <div className="flex mt-4 gap-4">
              <Link to="/Pokedex">
                <button className="bg-red-600 text-white border border-white px-2 py-3 rounded-2xl ">
                  Explore Pokedex
                </button>
              </Link>
              <Link to="/Discover">
                <button className="bg-red-600 text-white border border-white px-2 py-3 rounded-2xl ">
                  Discover Pokemon
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center  relative ">
          <div className="bg-red-300 ml-40 rounded-full w-60 h-60 pt-1 ">
            <div className="flex justify-center items-center   bg-linear-to-b from-red-700 to-red-300 w-58 h-58 rounded-full  ml-1 ">
              <hr className=" z-0 bg-black/50 absolute w-58 h-8 rounded  " />

              <div className="z-1 flex justify-center items-center h-20 w-20 bg-gray-300 rounded-full  ">
                <div className="h-18 w-18 rounded-full bg-white "></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative flex items-end pb-2">
          <img
            className="h-16 absolute bottom-20 left-2 z-10"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/39.gif`}
          />
          <img
            className="h-24 absolute bottom-20 left-14 z-20"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif`}
          />
          <img
            className="h-20 absolute bottom-20 left-28 z-10"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`}
          />
          <img
            className="h-32 absolute bottom-20 left-40 z-20"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif`}
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="mt-10 ml-4 h-50 w-full mb-10  ">
        <div className="flex font-semibold text-4xl gap-1 justify-center   ">
          <h1 className="">Browse by</h1>
          <h1 className="text-red-600"> Type</h1>
        </div>
        <div className="text-xl mt-16 flex gap-6   ">
          <Button
            className="bg-red-200 text-red-500 px-10 py-2 rounded-2xl    "
            name="🔥Fire"
            onClick={() => navigate("/Pokedex?type=fire")}
          />
          <Button
            className="bg-blue-200 text-blue-500 px-10 py-2 rounded-2xl    "
            name="💧 Water"
            onClick={() => navigate("/Pokedex?type=water")}
          />

          <Button
            className="bg-green-200 text-green-500 px-10 py-2 rounded-2xl    "
            name="🌿 Grass"
            onClick={() => navigate("/Pokedex?type=grass")}
          />

          <Button
            className="bg-yellow-200 text-yellow-500 px-10 py-2 rounded-2xl    "
            name="⚡ Electric"
            onClick={() => navigate("/Pokedex?type=electric")}
          />
          <Button
            className="bg-purple-200 text-purple-500 px-10 py-2 rounded-2xl    "
            name="🌑 Dark"
            onClick={() => navigate("/Pokedex?type=dark")}
          />

          <Button
            className="bg-pink-200 text-pink-500 px-10 py-2 rounded-2xl    "
            name="🔮 Psychic"
            onClick={() => navigate("/Pokedex?type=psychic")}
          />
          <Button
            className="bg-emerald-200 text-emerald-500 px-10 py-2 rounded-2xl    "
            name="🐉 Dragon"
            onClick={() => navigate("/Pokedex?type=dragon")}
          />

          <Button
            className="bg-cyan-200 text-cyan-500 px-10 py-2 rounded-2xl    "
            name="❄️ Ice"
            onClick={() => navigate("/Pokedex?type=ice")}
          />
        </div>
      </div>

      {/* Third section */}
      <div className="flex flex-col justify-center items-center mb-8 w-full  ">
        <div className=" relative h-16 w-full flex justify-center items-center bg-red-500 mb-10 py-4">
          <hr className="text-white w-[90%] absolute" />

          <h1 className=" bg-red-500 absolute text-3xl z-20 text-white font-semibold px-4">
            Featured Pokemon
          </h1>
        </div>

        <div className=" w-full grid grid-cols-5  gap-8  justify-center items-center ">
          {pokedata.map((p) => (
            <Card
              key={p.id}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${p.id}.gif`}
              name={p.name}
              id={p.id}
              type={p.types[0].type.name}
              imgSize="h-20 w-20"
              filter={() => sus(p)}
            />
          ))}
          {show && indi && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50"
              onClick={() => setShow(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Popup
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${indi.id}.gif`}
                  name={indi.name}
                  type={indi.types[0].type.name}
                  stat={indi.stats.map((s, ind) => (
                    <span key={ind}>
                      {s.stat.name}:{s.base_stat}
                    </span>
                  ))}
                  move={indi.moves.slice(0, 4).map((m, i) => (
                    <span className="font-semibold" key={i}>
                      {m.move.name}
                    </span>
                  ))}
                  ability={indi.abilities.map((a, i) => (
                    <span className="font-semibold" key={i}>
                      {a.ability.name}
                    </span>
                  ))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-20 overflow-hidden relative bg-red-400">
        <div className="flex gap-6 absolute animate-slide hover:[animation-play-state:paused]">
          {[...all, ...all].map((p, index) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return (
              <img
                key={index}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
                className="h-20 w-20 object-contain shrink-0"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
