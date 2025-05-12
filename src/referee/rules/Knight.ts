import { TeamType } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIssEmtyOrOccupiedByOpponent } from "./generalRules";

export const knightMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            //TOP AND Bottom
            if (desiredPosition.y - initialPosition.y === i * 2) {
                if (desiredPosition.x - initialPosition.x === j) {
                    if (tileIssEmtyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                        return true
                    }
                }
            }
            //RIGht AND LEFT
            if (desiredPosition.x - initialPosition.x === 2 * i) {
                if (desiredPosition.y - initialPosition.y === j) {
                    if (tileIssEmtyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                        return true
                    }
                }
            }
        }
    }
    return false
}