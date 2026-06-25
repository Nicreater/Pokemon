import Navi from "./Nav";
import Card from "../Card";
import { useEffect, useState } from "react";
import Index from ".";
import { useSearchParams } from "react-router-dom";
import Load from "../../assets/Load.gif"
import { OrbitProgress } from "react-loading-indicators";
import Popup from "../Popup";

export default function Pokedex() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("type") || "");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState(null)


  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
      );

      const d = await response.json();

      const detailed = await Promise.all(
        d.results.map((p) => fetch(p.url).then((r) => r.json())),
      );
      setData(detailed);
      setLoading(false);
    }
    getData();
  }, []);

  const filtered = data.filter((p) =>
    p.name.includes(name) || p.types.some((t) => t.type.name.includes(name))
  );

  const stat = (p) => {
    setSelected(p)
    setShow(true)
  }

  const playCry = (id) => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`
    );

    audio.play();
  };

  return (
    <div>
      <Navi />
      <div className=" w-full mt-5 flex justify-center">
        <input
          className="bg-red-500 w-[80%] pl-4 text-white font-semibold outline-none py-3  rounded "
          type="text"
          placeholder="Enter the pokemon you would like to search"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <>
        {loading ? (
          <div className="flex w-full  justify-center items-center h-screen ">
            <img src={Load} alt="" />
          </div>
        ) : (
          <div className="grid grid-cols-5 justify-center items-center gap-6 mt-10 ">
            {filtered.map((p, index) => (
              <Card
                filter={() => {
                  playCry(p.id);
                  stat(p);
                }}
                cry={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${p.id}.ogg`}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.indexOf(p) + 1}.gif`}
                name={p.name}
                id={p.id}
                key={index}
                type={p.types[0].type.name}
                imgSize="w-16 h-16"

              />
            ))}
          </div>
        )}
        {show && selected && (
          <div className="fixed inset-0 flex justify-center items-center z-50"
            onClick={() => setShow(false)}
          >

            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.indexOf(selected) + 1}.gif`}
                name={selected.name}
                type={selected.types[0].type.name}

                stat={selected.stats.map((s, ind) => (
                  <span key={ind}>{s.stat.name}:{s.base_stat}</span>
                ))
                }
                move={
                  selected.moves.slice(0, 4).map((m, i) => (
                    <span className="font-semibold" key={i}>{m.move.name}</span>
                  ))

                }
                ability=
                {selected.abilities.map((a, i) => (
                  <span className="font-semibold" key={i}>{a.ability.name}</span>

                ))}
              />
            </div>
          </div>

        )}
      </>
    </div>
  );
}
