import type { Piece } from "../../components/models/Piece";
import { samePosition, TeamType, PieceType } from "../../Constant";
import type { Position } from "../../Constant";
import { tileIsOccupied, tileIsOccupiedByOpponent, tileIssEmtyOrOccupiedByOpponent } from "./generalRules";

export const pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    const specialRow = team === TeamType.OUR ? 1 : 6;
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    // Di chuyển thẳng
    if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) {
        if (!tileIsOccupied(desiredPosition, boardState) && !tileIsOccupied({ x: desiredPosition.x, y: desiredPosition.y - pawnDirection }, boardState)) {
            return true;
        }
    } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (!tileIsOccupied(desiredPosition, boardState)) {
            return true;
        }
    }

    // Ăn chéo
    if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    }
    return false
}

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = []
    const specialRow = pawn.team === TeamType.OUR ? 1 : 6;
    const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1

    const normalMove: Position = { x: pawn.position.x, y: pawn.position.y + pawnDirection }
    const specialMove: Position = { x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 }
    const upperLeftAttack: Position = { x: pawn.position.x - 1, y: pawn.position.y + pawnDirection }
    const upperRightAttack: Position = { x: pawn.position.x + 1, y: pawn.position.y + pawnDirection }
    const leftPosition: Position = { x: pawn.position.x - 1, y: pawn.position.y }
    const rightPosition: Position = { x: pawn.position.x + 1, y: pawn.position.y }
    if (!tileIsOccupied(normalMove, boardState)) {

        possibleMoves.push(normalMove)
        if (pawn.position.y === specialRow && !tileIsOccupied(specialMove, boardState)) {
            possibleMoves.push(specialMove)
        }
    }

    if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
        possibleMoves.push(upperLeftAttack)
    } else if (!tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
        const leftPiece = boardState.find(p => samePosition(p.position, leftPosition))
        if (leftPiece !== null && leftPiece?.type === PieceType.PAWN && leftPiece?.enPassant) {
            possibleMoves.push(upperLeftAttack)
        }
    }

    if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
        possibleMoves.push(upperRightAttack)
    } else if (!tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
        const rightPiece = boardState.find(p => samePosition(p.position, rightPosition))
        if (rightPiece !== null && rightPiece?.type === PieceType.PAWN && rightPiece?.enPassant) {
            possibleMoves.push(upperRightAttack)
        }
    }
    return possibleMoves
}

