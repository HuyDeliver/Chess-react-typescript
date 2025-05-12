import type { Position } from "../../Constant";
import Chessboard from "../Chessboard/Chessboard";

export default function Referee() {
    const getPossibleMoves = (): Position[] => {
        console.log("getting move")
        return []
    }

    const playMove = () => {
        console.log("palying move")
    }
    return (
        <>
            <Chessboard
                getPossibleMoves={getPossibleMoves}
                playMove={playMove}
            />
        </>
    )
}