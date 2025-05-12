import { PieceType, TeamType, samePosition } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";
export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
    for (let i = 1; i < 8; i++) {
        //top right
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y + i }
            //if the tile is the destination tile
            if (samePosition(passedSquare, desiredPosition)) {
                //Dealing with passing tile
                if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else {
                //Dealing with passing tile
                if (tileIsOccupied(passedSquare, boardState)) {
                    break
                }
            }
        }
        //bottm right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y - i }
            if (samePosition(passedSquare, desiredPosition)) {
                //Dealing with passing tile
                if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else {
                //Dealing with passing tile
                if (tileIsOccupied(passedSquare, boardState)) {
                    break
                }
            }
        }
        //bottom left movement
        if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y - i }
            if (samePosition(passedSquare, desiredPosition)) {
                //Dealing with passing tile
                if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else {
                //Dealing with passing tile
                if (tileIsOccupied(passedSquare, boardState)) {
                    break
                }
            }
        }
        //top left movement
        if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y + i }
            if (samePosition(passedSquare, desiredPosition)) {
                //Dealing with passing tile
                if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else {
                //Dealing with passing tile
                if (tileIsOccupied(passedSquare, boardState)) {
                    break
                }
            }
        }
    }
    return false
}