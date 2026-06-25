import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Tic() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  const [popup, setPopup] = useState(false);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [onesymb, setoneSymb] = useState("X");
  const [player, setPlayer] = useState("X");
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winnerMsg, setWinnerMsg] = useState("");

  const twosymb = onesymb === "X" ? "O" : "X";

  const WinningP = [
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
  ];

  useEffect(() => {
    setPopup(true);
  }, []);

  const CheckWinner = (newBoard) => {
    for (let pattern of WinningP) {
      let [[a1,a2],[a3,a4],[a5,a6]] = pattern;
      if (
        newBoard[a1][a2] &&
        newBoard[a1][a2] === newBoard[a3][a4] &&
        newBoard[a1][a2] === newBoard[a5][a6]
      ) {
        return newBoard[a1][a2];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (popup || winnerMsg) return;
    const row = Math.floor(index / 3);
    const column = index % 3;

    const newBoard = board.map(r => [...r]);

    if (newBoard[row][column] !== "") return;

    newBoard[row][column] = player;
    setBoard(newBoard);

    const winner = CheckWinner(newBoard);

    
    if (winner) {
      if (winner === onesymb) setPlayer1(prev => prev + 1);
      else setPlayer2(prev => prev + 1);
      setShowConfetti(true);
      setWinnerMsg(`🏆 Winner: ${winner === onesymb ? first : second}`);
      return;
    }
    if (!winner && newBoard.every(row=>row.every(cell=>cell!==""))
    ){setWinnerMsg(`🤝 Its a draw`)
    }

    setPlayer(player === onesymb ? twosymb : onesymb);
  };

  const reset = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setPlayer(onesymb);
    setShowConfetti(false);
    setWinnerMsg("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showConfetti && <Confetti numberOfPieces={300} gravity={0.2} />}

      {popup && (
        <div className="flex justify-center items-center w-screen h-screen">
          <div className="pt-6 flex flex-col items-center gap-3 w-[50%] bg-[#24B1B1] rounded-2xl pb-8">

            <label className="text-white font-semibold">Name for player one</label>
            <input className="bg-green-200 w-[60%] px-2 py-1 rounded" type="text"
              placeholder="Enter name..."
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />

            <label className="text-white font-semibold">Select symbol for player one</label>
            <div className="flex gap-6">
              <label className="text-white flex items-center gap-1 cursor-pointer">
                <input type="radio" name="symbol" value="X"
                  checked={onesymb === "X"}
                  onChange={(e) => setoneSymb(e.target.value)} />
                X
              </label>
              <label className="text-white flex items-center gap-1 cursor-pointer">
                <input type="radio" name="symbol" value="O"
                  checked={onesymb === "O"}
                  onChange={(e) => setoneSymb(e.target.value)} />
                O
              </label>
            </div>

            <label className="text-white font-semibold">Name for player two</label>
            <input className="bg-green-200 w-[60%] px-2 py-1 rounded" type="text"
              placeholder="Enter name..."
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            />
            <p className="text-white/80 text-sm">Player 2 symbol: <strong>{twosymb}</strong></p>

            <button onClick={() => setPopup(false)}
              className="bg-blue-600 mt-4 px-10 py-1 rounded-2xl text-white">
              Submit
            </button>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>

      <h2 className="text-2xl mb-4">Player Turn: {player}</h2>

      {winnerMsg && <div className="text-2xl font-bold text-green-600 mb-4">{winnerMsg}</div>}

      <div className="mb-4">
        <h3>{first}'s Score ({onesymb}): {player1}</h3>
        <h3>{second}'s Score ({twosymb}): {player2}</h3>
      </div>

      <div className="grid grid-cols-3 w-96 h-96">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(i * 3 + j)}
              className="border text-5xl font-bold flex items-center justify-center"
            >
              {cell}
            </button>
          ))
        )}
      </div>

      <button onClick={reset}
        className="mt-6 px-6 py-3 bg-black text-white rounded">
        Play Again
      </button>
    </div>
  );
}