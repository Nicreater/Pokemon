import { Link } from "react-router-dom";
import pika from "../../assets/pika.png";
import pokeball from "../../assets/pokeball.png";
export default function Navi() {
  return (
    <div className="flex bg-red-600 text-white font-mono w-screen font-semibold  ">
      <ol className="flex w-full justify-between gap-10 relative py-6  ">
        <li>
          <img className="absolute " src={pokeball} alt="" />
        </li>
        <li className="font-['Fredoka-One'] ">
          <h1
            className="font-['Fredoka_One'] text-yellow-300 text-4xl font-bold"
            style={{
              WebkitTextStroke: "2px #003A70",
              textShadow: "2px 2px 0px #003A70",
            }}
          >
            Pokémon
          </h1>
        </li>

        <li className="hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Pokedex">Pokedex</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Discover">Discover</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Team">Team Builder</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Battle">Battle</Link>
        </li>

        <li>
          <img className="absolute top-0 right-0 h-20" src={pika} alt="" />
        </li>
      </ol>
    </div>
  );
}
