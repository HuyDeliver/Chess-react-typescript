import { PieceType, TeamType, samePosition } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";
export const rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
    if (initialPosition.x === desiredPosition.x) {
        for (let i = 1; i < 8; i++) {
            let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1
            let passedSquare: Position = { x: initialPosition.x, y: initialPosition.y + (i * multiplier) }
            if (samePosition(passedSquare, desiredPosition)) {
                if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else if (tileIsOccupied(passedSquare, boardState)) {
                break
            }
        }
    }
    if (initialPosition.y === desiredPosition.y) {
        for (let i = 1; i < 8; i++) {
            let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1
            let passedSquare: Position = { x: initialPosition.x + (i * multiplier), y: initialPosition.y }
            if (samePosition(passedSquare, desiredPosition)) {
                if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else if (tileIsOccupied(passedSquare, boardState)) {
                break
            }
        }
    }
    return false
}