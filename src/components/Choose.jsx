

export default function choose({id, image, type, name, onClick}){
    const typeColors = {
    fire: "bg-red-200",
    water: "bg-blue-200",
    grass: "bg-green-200",
    electric: "bg-yellow-200",
    psychic: "bg-pink-200",
    ice: "bg-cyan-200",
    dark: "bg-purple-200",
    dragon: "bg-emerald-200",
    normal: "bg-gray-200",
    poison: "bg-violet-200",
    ground: "bg-orange-200",
    rock: "bg-stone-200",
    bug: "bg-lime-200",
    ghost: "bg-indigo-200",
    steel: "bg-slate-200",
    fighting: "bg-red-400",
    flying: "bg-sky-200",
    fairy: "bg-rose-200",
  };
  const typeColorsb = {
    fire: "bg-red-400",
    water: "bg-blue-400",
    grass: "bg-green-400",
    electric: "bg-yellow-400",
    psychic: "bg-pink-400",
    ice: "bg-cyan-400",
    dark: "bg-purple-400",
    dragon: "bg-emerald-400",
    normal: "bg-gray-400",
    poison: "bg-violet-400",
    ground: "bg-orange-400",
    rock: "bg-stone-400",
    bug: "bg-lime-400",
    ghost: "bg-indigo-400",
    steel: "bg-slate-400",
    fighting: "bg-red-400",
    flying: "bg-sky-400",
    fairy: "bg-rose-400",
  };
  const typeColorst = {
    fire: "text-red-800",
    water: "text-blue-800",
    grass: "text-green-800",
    electric: "text-yellow-800",
    psychic: "text-pink-800",
    ice: "text-cyan-800",
    dark: "text-purple-800",
    dragon: "text-emerald-800",
    normal: "text-gray-800",
    poison: "text-violet-800",
    ground: "text-orange-800",
    rock: "text-stone-800",
    bug: "text-lime-800",
    ghost: "text-indigo-800",
    steel: "text-slate-800",
    fighting: "text-red-800",
    flying: "text-sky-800",
    fairy: "text-rose-800",
  };

  const bg=typeColors[type]
  const bgb = typeColorsb[type]
  const bgt = typeColorst[type]
return(
    <div className={`${bg} flex flex-col items-center justify-center  `}>
        <p className="font-bold">{`#${id}`}</p> 
        <div>
            <img className="w-20 h-20" 
             onError={(e) =>
          (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image.match(/\d+/g).pop()}.png`)}
            src={image} />
        </div>
    <div className={`${bgt} flex flex-col items-center capitalize gap-2 mb-4`}>
        <p>{type}</p>
        <p>{name}</p>
        <button className={`${bgb} px-4 py-2 rounded-2xl`}
        onClick={onClick}
        >Choose</button>
    </div>
    </div>



)
}