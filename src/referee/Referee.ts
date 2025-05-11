import { PieceType, TeamType, samePosition } from "../Constant";
import type { Pieces, Position } from "../Constant";
export default class Referee {
    tileIssEmtyOrOccupiedByOpponent(desiredPosition: Position, boardState: Pieces[], team: TeamType) {
        return !this.tileIsOccupied(desiredPosition, boardState) || this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)
    }
    //hàm kiểm tra xem quân có bị chặn ??
    tileIsOccupied(desiredPosition: Position, boardState: Pieces[]): boolean {
        console.log("Kiểm tra xem ô (" + desiredPosition.x + ", " + desiredPosition.y + ") có bị chiếm không...");

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

    isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Pieces[]) {
        if (type === PieceType.PAWN) {
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
        }
        else if (type === PieceType.KNIGHT) {
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
        }
        else if (type === PieceType.BISHOP) {
            //Movement and attackt right

            for (let i = 1; i < 8; i++) {
                //top right
                if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                    let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y + i }
                    //if the tile is the destination tile
                    if (passedSquare.x === desiredPosition.x && passedSquare.y === desiredPosition.y) {
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
                    console.log("check if bottom right")
                    let passedSquare: Position = { x: initialPosition.x + i, y: initialPosition.y - i }
                    if (passedSquare.x === desiredPosition.x && passedSquare.y === desiredPosition.y) {
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
                    if (passedSquare.x === desiredPosition.x && passedSquare.y === desiredPosition.y) {
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
                    if (passedSquare.x === desiredPosition.x && passedSquare.y === desiredPosition.y) {
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

        }

    }
}
