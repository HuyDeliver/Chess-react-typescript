import { TeamType } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupiedByOpponent, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";

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

export const getPossibleKnightMoves = (knight: Pieces, boardState: Pieces[]): Position[] => {
    const possibleMoves: Position[] = []
    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            const verticalMove: Position = { x: knight.position.x + j, y: knight.position.y + i * 2 }
            const horizontalMove: Position = { x: knight.position.x + i * 2, y: knight.position.y + j }
            if (tileIssEmtyOrOccupiedByOpponent(verticalMove, boardState, knight.team)) {
                possibleMoves.push(verticalMove)
            }
            if (tileIssEmtyOrOccupiedByOpponent(horizontalMove, boardState, knight.team)) {
                possibleMoves.push(horizontalMove)
            }
        }
    }
    return possibleMoves
}