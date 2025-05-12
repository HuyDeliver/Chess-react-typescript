import type { Position, Pieces } from "../../Constant"
import { samePosition, TeamType } from "../../Constant"

//hàm kiểm tra xem quân có bị chặn ??
export const tileIsOccupied = (desiredPosition: Position, boardState: Pieces[]): boolean => {
    const piece = boardState.find((p) => samePosition(p.position, desiredPosition))
    if (piece) {
        return true
    } else {
        return false
    }
}
export const tileIsOccupiedByOpponent = (desiredPosition: Position, boardState: Pieces[], team: TeamType): boolean => {
    const piece = boardState.find((p) => samePosition(p.position, desiredPosition) && p.team !== team)
    if (piece) {
        return true
    } else {
        return false
    }
}
export const tileIssEmtyOrOccupiedByOpponent = (desiredPosition: Position, boardState: Pieces[], team: TeamType) => {
    return !tileIsOccupied(desiredPosition, boardState) || tileIsOccupiedByOpponent(desiredPosition, boardState, team)
}
