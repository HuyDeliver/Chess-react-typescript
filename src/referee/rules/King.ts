import { TeamType, samePosition } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupied, tileIssEmtyOrOccupiedByOpponent, tileIsOccupiedByOpponent } from "./generalRules";
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

export const getPossibleKingMoves = (king: Pieces, boardState: Pieces[]): Position[] => {
    const possibleMove: Position[] = []
    //top
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x, y: king.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x, y: king.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //left
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x - i, y: king.position.y }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //right
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x + i, y: king.position.y }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x + i, y: king.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //upper left
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x - i, y: king.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom right
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x + i, y: king.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom left
    for (let i = 1; i < 2; i++) {
        const destination: Position = { x: king.position.x - i, y: king.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    return possibleMove
}