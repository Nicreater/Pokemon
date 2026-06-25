import { Link } from "react-router-dom";
export default function First() {
  return (
    <div className="w-screen h-screen bg-[url(https://static.vecteezy.com/system/resources/previews/025/934/704/large_2x/abstract-neon-light-gaming-background-generated-by-ai-free-photo.jpg)] flex flex-col gap-10 justify-center items-center ">
      <h1 className="text-blue-300 text-6xl font-bold font-sans  ">
        Want to play tic tac toe
      </h1>

      <Link to="/Login">
        <button className="bg-pink-300 text-white font-bold px-26 py-3 rounded-xl ">
          {" "}
          Play{" "}
        </button>
      </Link>
    </div>
  );
}
