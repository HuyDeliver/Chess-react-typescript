import type { Piece } from "../../components/models/Piece"
import type { Position } from "../../Constant"
import { samePosition, TeamType } from "../../Constant"

//hàm kiểm tra xem quân có bị chặn ??
export const tileIsOccupied = (desiredPosition: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find((p) => samePosition(p.position, desiredPosition))
    if (piece) {
        return true
    } else {
        return false
    }
}
export const tileIsOccupiedByOpponent = (desiredPosition: Position, boardState: Piece[], team: TeamType): boolean => {
    const piece = boardState.find((p) => samePosition(p.position, desiredPosition) && p.team !== team)
    if (piece) {
        return true
    } else {
        return false
    }
}
export const tileIssEmtyOrOccupiedByOpponent = (desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    return !tileIsOccupied(desiredPosition, boardState) || tileIsOccupiedByOpponent(desiredPosition, boardState, team)
}
