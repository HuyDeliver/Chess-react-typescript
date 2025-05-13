import { PieceType, TeamType } from "../../Constant";
import type { Position } from "../../Constant";

export class Piece {
    image: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
    possibleMoves?: Position[];
    constructor(image: string, position: Position, type: PieceType,
        team: TeamType) {
        this.image = image;
        this.position = position;
        this.type = type;
        this.team = team;
    }
}