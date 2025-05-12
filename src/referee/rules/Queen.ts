import { TeamType, samePosition } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupied, tileIssEmtyOrOccupiedByOpponent, tileIsOccupiedByOpponent } from "./generalRules";
export const queenMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
    //cách 1
    // for (let i = 1; i < 8; i++) {
    //     //đi thẳng
    //     //top bottom
    //     if (desiredPosition.x === initialPosition.x) {
    //         let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1
    //         let passedSquare: Position = { x: initialPosition.x, y: initialPosition.y + (i * multiplier) }
    //         if (samePosition(passedSquare, desiredPosition)) {
    //             if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
    //                 return true
    //             }
    //         } else if (tileIsOccupied(passedSquare, boardState)) {
    //             break
    //         }
    //     }
    //     //right
    //     if (initialPosition.y === desiredPosition.y) {
    //         let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1
    //         let passedSquare: Position = { x: initialPosition.x + (i * multiplier), y: initialPosition.y }
    //         if (samePosition(passedSquare, desiredPosition)) {
    //             if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
    //                 return true
    //             }
    //         } else if (tileIsOccupied(passedSquare, boardState)) {
    //             break
    //         }
    //     }

    //     //đi chéo
    //     //top right
    //     if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
    //         let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y + i }
    //         //if the tile is the destination tile
    //         if (samePosition(passedSquare, desiredPosition)) {
    //             //Dealing with passing tile
    //             if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
    //                 return true
    //             }
    //         } else {
    //             //Dealing with passing tile
    //             if (tileIsOccupied(passedSquare, boardState)) {
    //                 break
    //             }
    //         }
    //     }
    //     //bottm right movement
    //     if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
    //         console.log("check if bottom right")
    //         let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y - i }
    //         if (samePosition(passedSquare, desiredPosition)) {
    //             //Dealing with passing tile
    //             if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
    //                 return true
    //             }
    //         } else {
    //             //Dealing with passing tile
    //             if (tileIsOccupied(passedSquare, boardState)) {
    //                 break
    //             }
    //         }
    //     }
    //     //bottom left movement
    //     if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
    //         let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y - i }
    //         if (samePosition(passedSquare, desiredPosition)) {
    //             //Dealing with passing tile
    //             if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
    //                 return true
    //             }
    //         } else {
    //             //Dealing with passing tile
    //             if (tileIsOccupied(passedSquare, boardState)) {
    //                 break
    //             }
    //         }
    //     }
    //     //top left movement
    //     if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
    //         let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y + i }
    //         if (samePosition(passedSquare, desiredPosition)) {
    //             //Dealing with passing tile
    //             if (tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
    //                 return true
    //             }
    //         } else {
    //             //Dealing with passing tile
    //             if (tileIsOccupied(passedSquare, boardState)) {
    //                 break
    //             }
    //         }
    //     }

    // }
    //cách 2: 
    for (let i = 1; i < 8; i++) {
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
export const getPossibleQueenMoves = (queen: Pieces, boardState: Pieces[]): Position[] => {
    const possibleMove: Position[] = []
    //top
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x, y: queen.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x, y: queen.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //left
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x - i, y: queen.position.y }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //right
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x + i, y: queen.position.y }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x + i, y: queen.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //upper left
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x - i, y: queen.position.y + i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom right
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x + i, y: queen.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    //bottom left
    for (let i = 1; i < 8; i++) {
        const destination: Position = { x: queen.position.x - i, y: queen.position.y - i }
        if (!tileIsOccupied(destination, boardState)) {
            possibleMove.push(destination)
        } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
            possibleMove.push(destination)
            break
        } else {
            break
        }
    }
    return possibleMove
}