import { useEffect, useState, useRef } from "react";
import Navi from "./Nav";
import battleground from "../../assets/battleground.jpg";
import Card from "../Card";
import Button from "../Button";
import Battlecard from "../Battlecard";
import Moves from "../Moves";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { SiPanasonic } from "react-icons/si";
import Load from "../../assets/Load.gif"
import dark from "../../assets/dark.gif"
import fire from "../../assets/fire.gif"
import ghost from "../../assets/ghost.gif"
import water from "../../assets/water.gif"
import fairy from "../../assets/fairy.gif"
import ice from "../../assets/ice.gif"
import ground from "../../assets/ground.gif"
import grass from "../../assets/grass.gif"
import normal from "../../assets/normal.gif"
import steel from "../../assets/steel.gif"
import psychic from "../../assets/psychic.gif"
import flying from "../../assets/flying.gif"
import rock from "../../assets/rock.gif"
import bug from "../../assets/bug.gif"

export default function Battle() {
  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState(searchParams.get("type") || "");
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [chosen1, setChosen1] = useState(null);
  const [chosen2, setChosen2] = useState(null);
  const [player, setPlayer] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chosenIndexes, setChosenIndexes] = useState(null)
  const [hp1, setHp1] = useState(null)
  const [hp2, setHp2] = useState(null)
  const [maxhp1, setmaxhp1] = useState(null)
  const [maxhp2, setMaxhp2] = useState(null)
  const [turn, setTurn] = useState(1)
  const [battleStarted, setBattleStarted] = useState(false)
  const [log, setLog] = useState("")
  const [ready1, setReady1] = useState(false)
  const [ready2, setReady2] = useState(false)
  const [status1, setStatus1] = useState(null)
  const [status2, setStatus2] = useState(null)
  const [battleEnded, setBattleEnded] = useState(false)
  const [activeEffect, SetActiveEffect] = useState(null)
  const effectTimeRef = useRef(null)



  useEffect(() => {
    const getPokemonsFromLocalStorage = () => {
      const player1 = localStorage.getItem("PLAYER-1");
      const player2 = localStorage.getItem("PLAYER-2");

      const player1Index = localStorage.getItem("PLAYER-1-INDEX")
      const player2Index = localStorage.getItem("PLAYER-2-INDEX")

      if (!player1 && !player2 && !player1Index && !player2Index) return

      const parseJSON = (data) => JSON.parse(data);

      const p1 = parseJSON(player1)
      const p2 = parseJSON(player2)

      setChosen1(p1)
      setChosen2(p2)
      setChosenIndexes({
        chosenOne: Number(player1Index),
        chosenTwo: Number(player2Index)
      })
      const hp1val = p1?.stats.find(s => s.stat.name === "hp")?.base_stat
      const hp2val = p2?.stats.find(s => s.stat.name === "hp")?.base_stat
      setHp1(hp1val)
      setmaxhp1(hp1val)
      setHp2(hp2val)
      setMaxhp2(hp2val)

    }

    async function getpokemon() {
      setLoading(true)

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
      );
      const data = await response.json();
      const detailed = await Promise.all(
        data.results.map((p) => fetch(p.url).then((m) => m.json())),
      );
      setPokemon(detailed);
      setLoading(false);

      getPokemonsFromLocalStorage()
    }

    getpokemon();
  }, []);

  const Pokeleft = () => {
    setShow(true);
    setPlayer(1);
  };

  const Pokeright = () => {
    setShow(true);
    setPlayer(2);
  };


  const showing = (p) => {
    const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${p.id}.ogg`)
    audio.play()
    setSelected(p);
    setPopup(true);
  };

  const filtered = pokemon.filter((p, i) =>
    p.name.includes(name) || p.types.some((t) => t.type.name.includes(name)))


  const Choose = () => {
    setShow(false)
    if (player === 1) {
      const hp1val = selected?.stats.find(s => s.stat.name === "hp")?.base_stat
      setReady1(false)
      setHp1(hp1val)
      setmaxhp1(hp1val)
      setChosen1(selected);

      if (chosenIndexes) {
        setChosenIndexes((perv) => ({
          ...perv,
          chosenOne: (pokemon.indexOf(selected))
        }))
      }

      localStorage.setItem("PLAYER-1", JSON.stringify(selected))
      localStorage.setItem("PLAYER-1-INDEX", (pokemon.indexOf(selected)))
    } else {

      setChosen2(selected);
      setReady2(false)
      const hp2val = selected?.stats.find(s => s.stat.name === "hp")?.base_stat
      setHp2(hp2val)
      setMaxhp2(hp2val)

      if (chosenIndexes) {
        setChosenIndexes((perv) => ({
          ...perv,
          chosenTwo: (pokemon.indexOf(selected)),
        }))
      }
      localStorage.setItem("PLAYER-2", JSON.stringify(selected))
      localStorage.setItem("PLAYER-2-INDEX", (pokemon.indexOf(selected)))
    }
    setPopup(false);
    setShow(false);




  };

  const handleAttack = (attackNum, moveName, power, ailment, ailmentChance, moveType) => {
    const damage = Math.max(1, Math.floor(power / 5))
    const attackerStatus = attackNum === 1 ? status1 : status2


    if (attackerStatus === "paralysis" && Math.random() < 0.25) {
      setLog(`${attackNum === 1 ? chosen1.name : chosen2.name} is paralysed and cannot move`)
      setTurn(attackNum === 1 ? 2 : 1)
      return
    }
    if (attackerStatus === "sleep") {
      setLog(`${attackNum === 1 ? chosen1.name : chosen2.name} is asleep so they miss their turn`)
      setTurn(attackNum === 1 ? 2 : 1)
      return
    }

    if (attackNum === 1) {
      setHp2(prev => {
        const next = Math.max(0, prev - damage)
        if (next === 0) {
          setLog(`${chosen1.name} wins!`)
          setBattleEnded(true)
        }
        else setLog(`${chosen1.name} used ${moveName}! -${damage} HP`)
        return next
      })

      if (ailment && ailment !== "none" && Math.random() * 100 < ailmentChance) {
        setStatus2(ailment)
      }

      setTurn(2)
    } else {
      setHp1(prev => {
        const next = Math.max(0, prev - damage)
        if (next === 0) {
          setLog(`${chosen2.name} wins!`)
          setBattleEnded(true)
        }
        else setLog(`${chosen2.name} used ${moveName}! -${damage} HP`)
        return next
      })

      if (ailment && ailment !== "none" && Math.random() * 100 < ailmentChance) {
        setStatus1(ailment)
      }

      setTurn(1)
    }
    SetActiveEffect({ type: moveType, target: attackNum === 1 ? 2 : 1 })
  }


  const typeEffects = {
    dark: dark,
    fire: fire,
    water: water,
    ghost: ghost,
    ground: ground,
    ice: ice,
    normal: normal,
    rock: rock,
    grass: grass,
    fairy: fairy,
    psychic: psychic,
    steel: steel,
    flying: flying,
    bug: bug

  }

  const resetBattle = () => {
    setBattleStarted(false)
    setBattleEnded(false)
    setReady1(false)
    setReady2(false)
    setChosen1(null)
    setChosen2(null)
    setHp1(null)
    setHp2(null)
    setmaxhp1(null)
    setMaxhp2(null)
    setStatus1(null)
    setStatus2(null)
    setTurn(1)
    setLog("")
    localStorage.removeItem("PLAYER-1")
    localStorage.removeItem("PLAYER-2")
    localStorage.removeItem("PLAYER-1-INDEX")
    localStorage.removeItem("PLAYER-2-INDEX")
  }
  const replayBattle = () => {
    setBattleStarted(false)
    setBattleEnded(false)
    setTurn(1)
    setLog("")
    setStatus1(null)
    setStatus2(null)
    const hp1val = chosen1?.stats.find(s => s.stat.name === "hp")?.base_stat
    const hp2val = chosen2?.stats.find(s => s.stat.name === "hp")?.base_stat
    setHp1(hp1val)
    setHp2(hp2val)
  }

  console.log(hp1)
  console.log("chosen 1 moves: ", chosen1?.moves)


  return (
    <div className="w-screen h-screen">
      <Navi />
      {loading ? <div className="flex w-full  justify-center items-center h-screen ">
        <img src={Load} alt="" />
      </div> : <div className="relative px-6 h-full w-full">
        <div className="bg-red-600 w-full py-2 flex justify-center">
          <h1 className="text-4xl text-white font-bold">Battle Ground</h1>
        </div>

        <div className="relative h-full w-full gap-6 flex justify-center items-center ">
          <button onClick={Pokeleft}
            disabled={battleStarted && chosen1
            }
          >
            <img
              className="w-20 h-20 top-0 "
              src="data:image/jpeg;base64,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"
            />

          </button>

          <div className="relative h-[90%] w-[90%] bg-no-repeat bg-cover bg-center overflow-hidden rounded-2xl bg-[url(https://assets.pokemon.com/assets/cms2/img/watch-pokemon-tv/seasons/season15/season15_ep42_ss01.jpg)]">
            <div>
              {chosen1 && chosenIndexes && (
                <>
                  <img
                    className="absolute z-20 bottom-1/5 left-1/4 w-[10%] h-[10%] -scale-x-100 "
                    onError={(e) =>
                      (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chosenIndexes.chosenOne + 1}.png`)
                    }
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${chosenIndexes.chosenOne + 1}.gif`}
                  />

                  <div className="flex justify-between  mx-2 ">
                    <div className=" flex  mt-2 font-semibold  " >
                      HP
                      {chosen1 && chosenIndexes &&
                        <>
                          <progress className="h-6 accent-green-600"
                            value={hp1}
                            max={maxhp1}
                            style={{ accentColor: '#16a34a' }}
                          />
                          <span>
                            {hp1}/{maxhp1}
                          </span>
                        </>
                      }
                    </div>
                    <div className="flex justify-end mt-2 font-semibold">
                      HP
                      {chosen2 &&
                        <>
                          <progress className="h-6 rounded-full accent-green-600"
                            value={hp2}
                            max={maxhp2}
                            style={{ accentColor: '#16a34a' }}
                          />
                          <span>
                            {hp2}/{maxhp2}
                          </span>
                        </>
                      }
                    </div>
                  </div>
                  <div>
                    {chosen1 && chosen2 && !battleStarted && ready1 && ready2 && !battleEnded && (
                      <button
                        onClick={() => setBattleStarted(true)}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 bg-red-500 text-white px-6 py-2 rounded-xl font-bold"
                      >
                        Start Battle
                      </button>
                    )}
                    {log &&
                      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-2 rounded-xl font-semibold text-lg z-10 whitespace-nowrap">
                        {log}
                      </div>
                    }
                    {battleEnded && (
                      <button
                        onClick={resetBattle}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 bg-red-500 text-white px-6 py-2 rounded-xl font-bold"
                      >
                        Reset
                      </button>
                    )
                    }
                    {battleEnded && (
                      <button
                        onClick={replayBattle
                        }
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 bg-red-500 text-white px-6 py-2 rounded-xl font-bold"
                      >
                        Replay
                      </button>
                    )
                    }
                    {activeEffect?.target === 2 && (
                      <img
                        src={typeEffects[activeEffect.type]}
                        className="absolute inset-0  w-full h-full object-cover pointer-events-none animate-fadeout z-10"


                      />
                    )
                    }
                    {activeEffect?.target === 1 && (
                      <img
                        src={typeEffects[activeEffect.type]}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none animate-fadeout z-10"


                      />

                    )

                    }



                  </div>
                  {
                    <Moves
                      key={chosen1.name}
                      isPlayerOne
                      isMyTurn={battleStarted && turn === 1}
                      battleStarted={battleStarted}
                      onAttack={(moveName, power, ailment, ailmentChance, moveType) => handleAttack(1, moveName, power, ailment, ailmentChance, moveType)}
                      listOfMoves={chosen1.moves.map((c1) => c1.move.name)}
                      name={chosen1.name}
                      type={chosen1.types[0].type.name}
                      moves={chosen1.moves}
                      onReady={() => setReady1(true)}
                    />
                  }
                </>
              )}

              {chosen2 && (
                <>
                  <img
                    className="absolute bottom-1/5 right-1/4 w-[10%] h-[10%]  z-20 "
                    onError={(e) =>
                      (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chosenIndexes.chosenTwo + 1}.png`)
                    }
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${chosenIndexes.chosenTwo + 1}.gif`}
                  />
                  {<Moves
                    key={chosen2.name}
                    isMyTurn={battleStarted && turn === 2}
                    battleStarted={battleStarted}
                    onAttack={(moveName, power, ailment, ailmentChance, moveType) => handleAttack(2, moveName, power, ailment, ailmentChance, moveType)}
                    listOfMoves={chosen2.moves.map((m) => m.move.name
                    )}
                    name={chosen2.name}
                    type={chosen2.types[0].type.name}
                    moves={chosen2.moves}
                    onReady={() => setReady2(true)}
                  />}
                </>
              )}
            </div>
          </div>
          <button onClick={Pokeright}
            disabled={battleStarted && chosen2}
          >
            <img
              className="w-20 h-20  "
              src="data:image/jpeg;base64,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"
            />
          </button>

          {show && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-3xl bg-red-500/40 p-6 backdrop-blur-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-3xl text-white font-bold text-center">
                    Choose Your pokemon
                  </h2>
                  <button type="button" onClick={() => setShow(false)}>
                    <IoCloseCircleSharp className="fill-white size-8" />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-4">
                  <input
                    type="text"
                    className="bg-white py-3 text-red-500 outline-none pl-4 font-semibold w-full rounded-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the pokemon You would like to search"
                  />
                </div>

                <div className="w-full">
                  <div className="text-xl mt-4 flex flex-wrap gap-3">
                    <Button
                      className="bg-red-200 text-red-500 px-10 py-2 rounded-2xl"
                      name="🔥Fire"
                      onClick={() => setName("fire")}
                    />
                    <Button
                      className="bg-blue-200 text-blue-500 px-10 py-2 rounded-2xl"
                      name="💧 Water"
                      onClick={() => setName("water")}
                    />

                    <Button
                      className="bg-green-200 text-green-500 px-10 py-2 rounded-2xl"
                      name="🌿 Grass"
                      onClick={() => setName("grass")}
                    />

                    <Button
                      className="bg-yellow-200 text-yellow-500 px-10 py-2 rounded-2xl"
                      name="⚡ Electric"
                      onClick={() => setName("electric")}
                    />
                    <Button
                      className="bg-purple-200 text-purple-500 px-10 py-2 rounded-2xl"
                      name="🌑 Dark"
                      onClick={() => setName("dark")}
                    />

                    <Button
                      className="bg-pink-200 text-pink-500 px-10 py-2 rounded-2xl"
                      name="🔮 Psychic"
                      onClick={() => setName("psychic")}
                    />
                    <Button
                      className="bg-emerald-200 text-emerald-500 px-10 py-2 rounded-2xl"
                      name="🐉 Dragon"
                      onClick={() => setName("dragon")}
                    />

                    <Button
                      className="bg-cyan-200 text-cyan-500 px-10 py-2 rounded-2xl"
                      name="❄️ Ice"
                      onClick={() => setName("ice")}
                    />
                  </div>
                </div>

                <div className="h-[60vh] overflow-y-auto mt-4">
                  <div className="grid grid-cols-5 justify-center items-center gap-4 pr-2">
                    {filtered
                      .filter((p) => p && p.types)
                      .map((p, i) => (
                        <Card
                          filter={() => showing(p)}
                          key={i}
                          name={p.name}
                          imgSize="w-20 h-18"
                          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.indexOf(p) + 1}.gif`}
                          type={p.types[0].type.name}
                          id={p.id}
                        />
                      ))}
                    {popup && selected && (
                      <div
                        className="inset-0 absolute flex justify-center items-center"
                        onClick={() => setPopup(false)}
                      >
                        <Battlecard
                          name={selected.name}
                          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.indexOf(selected) + 1}.gif`}
                          type={selected.types[0].type.name}
                          stat={selected.stats.map((s, i) => (
                            <span key={i}>
                              {i + 1}) {s.stat.name}: {s.base_stat}{" "}
                            </span>
                          ))}
                          move={selected.moves.slice(0, 4).map((m, i) => (
                            <span key={i}>
                              {i + 1}) {m.move.name}
                            </span>
                          ))}
                          ability={selected.abilities.map((a, i) => (
                            <span key={i}>
                              {i + 1}) {a.ability.name}
                            </span>
                          ))}
                          onClick={Choose}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>}
    </div>
  );
}