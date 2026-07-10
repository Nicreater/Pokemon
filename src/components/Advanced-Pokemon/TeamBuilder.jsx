import { useEffect, useState } from "react"
import Navi from "./Nav"
import Choose from "../Choose"

export default function Teambuilder() {

    const [pokemon, setPokemon] = useState([])
    const [choosePokemon, setChoosePokemon] = useState(["", "", "", "", "", ""])

    useEffect(() => {
        async function getPokemon() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
            )
            const data = await response.json()
            const detailed = await Promise.all(
                data.results.map((d) => fetch(d.url).then((m) => m.json()))
            )

            console.log(detailed);

            setPokemon(detailed)
        }
        getPokemon()
    }, [])

    const choose=(i)=>{
        setChosenPokemon(i)

    }


    console.log(pokemon);

    return (
        <div className="h-screen ">
            <Navi />
            <div className="grid grid-cols-3 gap-3 ">
                {choosePokemon.map((c, i) => (
                    <Choose key={c}
                        

                    />
                       

                ))}
            </div>
            <div className="grid grid-cols-5 gap-4 ">
                {pokemon.map((p, i) => (
                    <Choose
                        key={i}
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.indexOf(p) + 1}.gif`}
                        id={p.id}
                        name={p.name}
                        type={p.types[0].type.name}
                        onClick={Choose

                        }


                    />
                ))

                }
            </div>
        </div>
    )
}