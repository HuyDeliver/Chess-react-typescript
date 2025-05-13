import type { Piece } from "../../components/models/Piece";
import { PieceType, TeamType, samePosition } from "../../Constant";
import type { Position } from "../../Constant";
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";
export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
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

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]): Position[] => {
    const possibleMove: Position[] = []
    //upper right
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: bishop.position.x + i, y: bishop.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //upper left
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: bishop.position.x - i, y: bishop.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom right
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: bishop.position.x + i, y: bishop.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom left
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: bishop.position.x - i, y: bishop.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    return possibleMove
}