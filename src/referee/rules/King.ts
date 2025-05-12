import { TeamType, samePosition } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupied, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";
export const kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
    for (let i = 1; i < 2; i++) {
        let multiplierX = desiredPosition.x < initialPosition.x ? -1 : desiredPosition.x > initialPosition.x ? 1 : 0
        let multiplierY = desiredPosition.y < initialPosition.y ? -1 : desiredPosition.y > initialPosition.y ? 1 : 0

        let passedSquare: Position = { x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY) }
        if (samePosition(passedSquare, desiredPosition)) {
            if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                return true
            }
        } else if (tileIsOccupied(passedSquare, boardState)) {
            break
        }
    }
    return false
}