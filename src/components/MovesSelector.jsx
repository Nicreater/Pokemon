const getEmojiAccToType = (type) => {
    switch (type) {
        case "fire":
            return "🔥";
        case "water":
            return "💧";
        case "grass":
            return "🌿";
        case "electric":
            return "⚡";
        case "ghost":
            return "👻";
        case "psychic":
            return "🔮";
        case "ground":
            return "🌍";
        case "rock":
            return "🪨";
        case "fairy":
            return "✨";
        case "fighting":
            return "🥊";
        case "flying":
            return "🪽";
        case "dark":
            return "🌑";
        case "dragon":
            return "🐉";
        case "ice":
            return "❄️";
        case "normal":
            return "⚪";
        case "bug":
            return "🐛";
        case "steel":
            return "⚙️";
        case "poison":
            return "☠️";
        default:
            return "❓";
    }

}

export default function MovesSelector({ name, moves, type, isPlayerOne = false }) {
    const typeColors = {
        fire: "bg-red-500/30",
        water: "bg-blue-500/30",
        grass: "bg-green-500/30",
        electric: "bg-yellow-500/30",
        psychic: "bg-pink-500/30",
        ice: "bg-cyan-500/30",
        dark: "bg-purple-500/30",
        dragon: "bg-emerald-500/30",
        normal: "bg-gray-500/30",
        poison: "bg-violet-500/30",
        ground: "bg-orange-500/30",
        rock: "bg-stone-500/30",
        bug: "bg-lime-500/30",
        ghost: "bg-indigo-500/30",
        steel: "bg-slate-500/30",
        fighting: "bg-red-500/30",
        flying: "bg-sky-500/30",
        fairy: "bg-rose-500/30",
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

    const bg = typeColors[type] || "bg-gray-100";

    const bgg = typeColorsb[type];
    const btext = typeColorst[type];

    const containerClassName = isPlayerOne ? "bottom-0 left-0" : "bottom-0 right-0"
    const movesBoxClassName = isPlayerOne ? "rounded-tr-xl" : "rounded-tl-xl"
    const textBoxClassName = isPlayerOne ? "flex-row-reverse " : ""


    return (
        <div className={`absolute ${containerClassName}  `}>
            <div className={`${bg} backdrop-blur-lg text-black p-2.5 ${movesBoxClassName}`} >
                <p>Choose Your Moves</p>
                <div className={`flex gap-3 ${textBoxClassName} justify-end font-semibold text-xl capitalize `}>
                    <span>{name}</span>
                    <span className={`font-bold text-xl capitalize`}>{getEmojiAccToType(type)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 ">
                    {moves.slice(0, 4).map((m, i) =>
                        <button key={i} className={`${bgg} px-4 py-2 rounded-xl capitalize font-semibold`}>{m.move.name}</button>)
                    }
                </div>
                <button> Done </button>
            </div>
        </div>
    )
}