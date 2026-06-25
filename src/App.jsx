import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Battle from "./components/Advanced-Pokemon/Battle.jsx";
import Index from "./components/Advanced-Pokemon/Index.jsx";
import Navi from "./components/Advanced-Pokemon/Nav.jsx";
import Pokedex from "./components/Advanced-Pokemon/Pokedex.jsx";
import AdvancePokemon from "./components/Advanced-Pokemon/PokemonGene.jsx";
import Teambuilder from "./components/Advanced-Pokemon/TeamBuilder.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Battle" element={<Battle />} />
        <Route path="/" element={<Index />} />
        <Route path="/nav" element={<Navi />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/discover" element={<AdvancePokemon />} />
        <Route path="/Team" element={<Teambuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
