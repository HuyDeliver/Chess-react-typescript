import { PieceType, TeamType } from "../Constant";
import type { Pieces, Position } from "../Constant";
import * as rules from "./rules"
export default class Referee {
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
        let validMove = false
        switch (type) {
            case PieceType.PAWN:
                validMove = rules.pawnMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.KNIGHT:
                validMove = rules.knightMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.BISHOP:
                validMove = rules.bishopMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.ROOK:
                validMove = rules.rookMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.QUEEN:
                validMove = rules.queenMove(initialPosition, desiredPosition, team, boardState)
                break
            case PieceType.KING:
                validMove = rules.kingMove(initialPosition, desiredPosition, team, boardState)
                break
            default:
                break
        }
        return validMove


    }
}
