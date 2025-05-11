export const VERTICALAXIS = [1, 2, 3, 4, 5, 6, 7, 8];


export const HORIZONTALAXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];



export interface Pieces {
    image: string,
    position: Position
    type: PieceType,
    team: TeamType,
    enPassant?: boolean
}
export interface Position {
    x: number,
    y: number,
}
export const samePosition = (p1: Position, p2: Position) => {
    return p1.x === p2.x && p1.y === p2.y
}
export const TeamType = {
    OPPONENT: 0,
    OUR: 1
} as const;

export type TeamType = typeof TeamType[keyof typeof TeamType];

export const PieceType = {
    PAWN: 0,
    BISHOP: 1,
    KNIGHT: 2,
    ROOK: 3,
    QUEEN: 4,
    KING: 5
} as const;

export type PieceType = typeof PieceType[keyof typeof PieceType];

export const TILESIZE = 75; // Khớp với ô 75px
export const PIECESIZE = 54; // Khớp với .chess-pieces
export const OFFSET = PIECESIZE / 2; // 27

export const initialBoardState: Pieces[] = [];
//y là hàng và x là cột

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "/assets/image/Chess_pdt60.png", position: { x: i, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT });
    initialBoardState.push({ image: "/assets/image/Chess_plt60.png", position: { x: i, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR });
}

for (let i = 0; i < 2; i++) {
    let teamType = (i === 0) ? TeamType.OPPONENT : TeamType.OUR
    let type = (teamType === TeamType.OPPONENT) ? "dt" : "lt"; //dt===black, lt===white
    let y = (teamType === TeamType.OPPONENT) ? 7 : 0;
    initialBoardState.push(
        //xe trắng + đen
        { image: `/assets/image/Chess_r${type}60.png`, position: { x: 0, y: y }, type: PieceType.ROOK, team: teamType },
        { image: `/assets/image/Chess_r${type}60.png`, position: { x: 7, y: y }, type: PieceType.ROOK, team: teamType },
        //Mã trắng + đen
        { image: `/assets/image/Chess_n${type}60.png`, position: { x: 1, y: y }, type: PieceType.KNIGHT, team: teamType },
        { image: `/assets/image/Chess_n${type}60.png`, position: { x: 6, y: y }, type: PieceType.KNIGHT, team: teamType },
        //Tượng trắng + đen
        { image: `/assets/image/Chess_b${type}60.png`, position: { x: 2, y: y }, type: PieceType.BISHOP, team: teamType },
        { image: `/assets/image/Chess_b${type}60.png`, position: { x: 5, y: y }, type: PieceType.BISHOP, team: teamType },
        //Hậu và Vua
        { image: `/assets/image/Chess_q${type}60.png`, position: { x: 3, y: y }, type: PieceType.QUEEN, team: teamType },
        { image: `/assets/image/Chess_k${type}60.png`, position: { x: 4, y: y }, type: PieceType.KING, team: teamType },
    );
}