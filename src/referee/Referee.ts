import { PieceType, TeamType, samePosition } from "../Constant";
import type { Pieces, Position } from "../Constant";
export default class Referee {
    tileIssEmtyOrOccupiedByOpponent(desiredPosition: Position, boardState: Pieces[], team: TeamType) {
        return !this.tileIsOccupied(desiredPosition, boardState) || this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)
    }
    //hàm kiểm tra xem quân có bị chặn ??
    tileIsOccupied(desiredPosition: Position, boardState: Pieces[]): boolean {
        const piece = boardState.find((p) => samePosition(p.position, desiredPosition))
        if (piece) {
            return true
        } else {
            return false
        }
    }
    tileIsOccupiedByOpponent(desiredPosition: Position, boardState: Pieces[], team: TeamType): boolean {
        const piece = boardState.find((p) => samePosition(p.position, desiredPosition) && p.team !== team)
        if (piece) {
            return true
        } else {
            return false
        }
    }
    isEnPassantMove(initialPosition: Position, desiredPosition: Position, boardState: Pieces[], type: PieceType, team: TeamType) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            // Kiểm tra nước đi chéo (tấn công en passant)
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find(
                    (p) => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant && p.type === PieceType.PAWN && p.team !== team
                );
                if (piece) {
                    return true;
                }
            }
        }
        return false;
    }

    pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
        const specialRow = team === TeamType.OUR ? 1 : 6;
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        // Di chuyển thẳng
        if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) {
            if (!this.tileIsOccupied(desiredPosition, boardState) && !this.tileIsOccupied({ x: desiredPosition.x, y: desiredPosition.y - pawnDirection }, boardState)) {
                return true;
            }
        } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
            if (!this.tileIsOccupied(desiredPosition, boardState)) {
                return true;
            }
        }

        // Ăn chéo
        if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
            if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
                return true;
            }
        }
        return false
    }
    kinghtMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                //TOP AND Bottom
                if (desiredPosition.y - initialPosition.y === i * 2) {
                    if (desiredPosition.x - initialPosition.x === j) {
                        if (this.tileIssEmtyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                            return true
                        }
                    }
                }
                //RIGht AND LEFT
                if (desiredPosition.x - initialPosition.x === 2 * i) {
                    if (desiredPosition.y - initialPosition.y === j) {
                        if (this.tileIssEmtyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
    bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
        for (let i = 1; i < 8; i++) {
            //top right
            if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y + i }
                //if the tile is the destination tile
                if (samePosition(passedSquare, desiredPosition)) {
                    //Dealing with passing tile
                    if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                        return true
                    }
                } else {
                    //Dealing with passing tile
                    if (this.tileIsOccupied(passedSquare, boardState)) {
                        break
                    }
                }
            }
            //bottm right movement
            if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y - i }
                if (samePosition(passedSquare, desiredPosition)) {
                    //Dealing with passing tile
                    if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                        return true
                    }
                } else {
                    //Dealing with passing tile
                    if (this.tileIsOccupied(passedSquare, boardState)) {
                        break
                    }
                }
            }
            //bottom left movement
            if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y - i }
                if (samePosition(passedSquare, desiredPosition)) {
                    //Dealing with passing tile
                    if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                        return true
                    }
                } else {
                    //Dealing with passing tile
                    if (this.tileIsOccupied(passedSquare, boardState)) {
                        break
                    }
                }
            }
            //top left movement
            if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y + i }
                if (samePosition(passedSquare, desiredPosition)) {
                    //Dealing with passing tile
                    if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                        return true
                    }
                } else {
                    //Dealing with passing tile
                    if (this.tileIsOccupied(passedSquare, boardState)) {
                        break
                    }
                }
            }
        }
        return false
    }
    rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
        if (initialPosition.x === desiredPosition.x) {
            for (let i = 1; i < 8; i++) {
                let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1
                let passedSquare: Position = { x: initialPosition.x, y: initialPosition.y + (i * multiplier) }
                if (samePosition(passedSquare, desiredPosition)) {
                    if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                        return true
                    }
                } else if (this.tileIsOccupied(passedSquare, boardState)) {
                    break
                }
            }
        }
        if (initialPosition.y === desiredPosition.y) {
            for (let i = 1; i < 8; i++) {
                let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1
                let passedSquare: Position = { x: initialPosition.x + (i * multiplier), y: initialPosition.y }
                if (samePosition(passedSquare, desiredPosition)) {
                    if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                        return true
                    }
                } else if (this.tileIsOccupied(passedSquare, boardState)) {
                    break
                }
            }
        }
        return false
    }
    queenMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
        //cách 1
        // for (let i = 1; i < 8; i++) {
        //     //đi thẳng
        //     //top bottom
        //     if (desiredPosition.x === initialPosition.x) {
        //         let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1
        //         let passedSquare: Position = { x: initialPosition.x, y: initialPosition.y + (i * multiplier) }
        //         if (samePosition(passedSquare, desiredPosition)) {
        //             if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
        //                 return true
        //             }
        //         } else if (this.tileIsOccupied(passedSquare, boardState)) {
        //             break
        //         }
        //     }
        //     //right
        //     if (initialPosition.y === desiredPosition.y) {
        //         let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1
        //         let passedSquare: Position = { x: initialPosition.x + (i * multiplier), y: initialPosition.y }
        //         if (samePosition(passedSquare, desiredPosition)) {
        //             if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
        //                 return true
        //             }
        //         } else if (this.tileIsOccupied(passedSquare, boardState)) {
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
        //             if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
        //                 return true
        //             }
        //         } else {
        //             //Dealing with passing tile
        //             if (this.tileIsOccupied(passedSquare, boardState)) {
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
        //             if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
        //                 return true
        //             }
        //         } else {
        //             //Dealing with passing tile
        //             if (this.tileIsOccupied(passedSquare, boardState)) {
        //                 break
        //             }
        //         }
        //     }
        //     //bottom left movement
        //     if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
        //         let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y - i }
        //         if (samePosition(passedSquare, desiredPosition)) {
        //             //Dealing with passing tile
        //             if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
        //                 return true
        //             }
        //         } else {
        //             //Dealing with passing tile
        //             if (this.tileIsOccupied(passedSquare, boardState)) {
        //                 break
        //             }
        //         }
        //     }
        //     //top left movement
        //     if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
        //         let passedSquare: Position = { x: initialPosition.x - i, y: initialPosition.y + i }
        //         if (samePosition(passedSquare, desiredPosition)) {
        //             //Dealing with passing tile
        //             if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
        //                 return true
        //             }
        //         } else {
        //             //Dealing with passing tile
        //             if (this.tileIsOccupied(passedSquare, boardState)) {
        //                 break
        //             }
        //         }
        //     }

        // }
        //cách 2: 
        //cách 2
        for (let i = 1; i < 8; i++) {
            let multiplierX = desiredPosition.x < initialPosition.x ? -1 : desiredPosition.x > initialPosition.x ? 1 : 0
            let multiplierY = desiredPosition.y < initialPosition.y ? -1 : desiredPosition.y > initialPosition.y ? 1 : 0

            let passedSquare: Position = { x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY) }
            if (samePosition(passedSquare, desiredPosition)) {
                if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else if (this.tileIsOccupied(passedSquare, boardState)) {
                break
            }
        }

        return false
    }
    kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
        for (let i = 1; i < 2; i++) {
            let multiplierX = desiredPosition.x < initialPosition.x ? -1 : desiredPosition.x > initialPosition.x ? 1 : 0
            let multiplierY = desiredPosition.y < initialPosition.y ? -1 : desiredPosition.y > initialPosition.y ? 1 : 0

            let passedSquare: Position = { x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY) }
            if (samePosition(passedSquare, desiredPosition)) {
                if (this.tileIssEmtyOrOccupiedByOpponent(passedSquare, boardState, team)) {
                    return true
                }
            } else if (this.tileIsOccupied(passedSquare, boardState)) {
                break
            }
        }
        return false
    }

    isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Pieces[]) {
        let validMove = false
        switch (type) {
            case PieceType.PAWN:
                validMove = this.pawnMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.KNIGHT:
                validMove = this.kinghtMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.BISHOP:
                validMove = this.bishopMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.ROOK:
                validMove = this.rookMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.QUEEN:
                validMove = this.queenMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.KING:
                validMove = this.kingMove(initialPosition, desiredPosition, team, boardState)
                break
            default:
                break
        }
        return validMove


    }
}
