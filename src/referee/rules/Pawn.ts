import { TeamType } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./generalRules";
export const pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Pieces[]): boolean => {
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

