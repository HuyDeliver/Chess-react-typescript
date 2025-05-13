import type { Piece } from "../../components/models/Piece";
import { PieceType, TeamType, samePosition } from "../../Constant";
import type { Position } from "../../Constant";
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";
export const rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
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

export const getPossibleRookMoves = (rook: Piece, boardState: Piece[]): Position[] => {
    const possibleMove: Position[] = []
    //top
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: rook.position.x, y: rook.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: rook.position.x, y: rook.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //left
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: rook.position.x - i, y: rook.position.y }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //right
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: rook.position.x + i, y: rook.position.y }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    return possibleMove
}