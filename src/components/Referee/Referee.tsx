import { useEffect, useRef, useState } from "react";
import { initialBoardState, type Position, PieceType, TeamType, samePosition } from "../../Constant";
import * as rules from "../../referee/rules"
import Chessboard from "../Chessboard/Chessboard";
import type { Piece } from "../models/Piece";

export default function Referee() {
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        updatePossibleMoves();
    }, []);

    const updatePossibleMoves = () => {
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p, currentPieces);
                return p;
            });
        });
    };

    // Helper function to create a deep copy of a piece to avoid reference issues
    const copyPiece = (piece: Piece): Piece => {
        return {
            ...piece,
            position: { ...piece.position },
            possibleMoves: piece.possibleMoves ? [...piece.possibleMoves] : []
        };
    };

    const playMove = (playPiece: Piece, destination: Position): boolean => {
        const validMove = isValidMove(playPiece.position, destination, playPiece.type, playPiece.team);
        const isEnpassant = isEnPassantMove(playPiece.position, destination, playPiece.type, playPiece.team);
        const pawnDirection = playPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnpassant) {
            const updatePieces = pieces.reduce((result, piece) => {
                // Update the current piece position
                if (samePosition(piece.position, playPiece.position)) {
                    const newPiece = copyPiece(piece);
                    newPiece.enPassant = false;
                    newPiece.position.x = destination.x;
                    newPiece.position.y = destination.y;
                    result.push(newPiece);
                }
                // Skip the piece being captured by en passant
                else if (!(samePosition(piece.position, { x: destination.x, y: destination.y - pawnDirection }))) {
                    const newPiece = copyPiece(piece);
                    if (newPiece.type === PieceType.PAWN) {
                        newPiece.enPassant = false;
                    }
                    result.push(newPiece);
                }
                return result;
            }, [] as Piece[]);

            setPieces(updatePieces);
            updatePossibleMoves();
        }
        else if (validMove) {
            // Create a new array of pieces with proper updates
            const updatePieces = pieces.reduce((result, piece) => {
                // Skip the piece if it's being captured (at destination but not the moving piece)
                if (samePosition(piece.position, destination) && !samePosition(piece.position, playPiece.position)) {
                    // This piece is being captured, don't add it to result
                    return result;
                }

                // Update the moving piece
                if (samePosition(piece.position, playPiece.position)) {
                    const newPiece = copyPiece(piece);

                    if (Math.abs(playPiece.position.y - destination.y) === 2 && newPiece.type === PieceType.PAWN) {
                        // Special move - pawn double step
                        newPiece.enPassant = true;
                    } else {
                        newPiece.enPassant = false;
                    }

                    // Move the piece
                    newPiece.position.x = destination.x;
                    newPiece.position.y = destination.y;

                    // Check for promotion
                    let promotionRow = (newPiece.team === TeamType.OUR) ? 7 : 0;
                    if (destination.y === promotionRow && newPiece.type === PieceType.PAWN) {
                        modalRef.current?.classList.remove('hidden');
                        setPromotionPawn(newPiece);
                    }

                    result.push(newPiece);
                } else {
                    // Add other pieces with en passant reset for pawns
                    const newPiece = copyPiece(piece);
                    if (newPiece.type === PieceType.PAWN) {
                        newPiece.enPassant = false;
                    }
                    result.push(newPiece);
                }

                return result;
            }, [] as Piece[]);

            setPieces(updatePieces);
            updatePossibleMoves();
        } else {
            return false;
        }

        return true;
    };

    const isEnPassantMove = (initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType) => {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            // Check for diagonal move (en passant capture)
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = pieces.find(
                    (p) => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant && p.type === PieceType.PAWN && p.team !== team
                );

                if (piece) {
                    return true;
                }
            }
        }

        return false;
    };

    const getValidMoves = (piece: Piece, boardState: Piece[]): Position[] => {
        switch (piece.type) {
            case PieceType.PAWN:
                return rules.getPossiblePawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return rules.getPossibleKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return rules.getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return rules.getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return rules.getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return rules.getPossibleKingMoves(piece, boardState);
            default:
                return [];
        }
    };

    const isValidMove = (initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType) => {
        let validMove = false;

        switch (type) {
            case PieceType.PAWN:
                validMove = rules.pawnMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.KNIGHT:
                validMove = rules.knightMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.BISHOP:
                validMove = rules.bishopMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.ROOK:
                validMove = rules.rookMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.QUEEN:
                validMove = rules.queenMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.KING:
                validMove = rules.kingMove(initialPosition, desiredPosition, team, pieces);
                break;
        }

        return validMove;
    };

    const promotionTeamType = () => {
        return promotionPawn?.team === TeamType.OUR ? 'lt' : 'dt';
    };

    const promotePawn = (type: PieceType) => {
        if (promotionPawn === undefined) {
            return;
        }

        // Create copies of all pieces to avoid mutation issues
        const updatePieces = pieces.reduce((result, piece) => {
            if (samePosition(piece.position, promotionPawn.position)) {
                // For the piece being promoted, make a deep copy and update its properties
                const newPiece = copyPiece(piece);
                newPiece.type = type;
                const teamType = newPiece.team === TeamType.OUR ? "lt" : 'dt';
                let image = '';

                switch (type) {
                    case PieceType.ROOK:
                        image = 'r';
                        break;
                    case PieceType.BISHOP:
                        image = 'b';
                        break;
                    case PieceType.KNIGHT:
                        image = 'n';
                        break;
                    case PieceType.QUEEN:
                        image = 'q';
                        break;
                }

                newPiece.image = `assets/image/Chess_${image}${teamType}60.png`;
                result.push(newPiece);
            } else {
                // For other pieces, just make a deep copy
                result.push(copyPiece(piece));
            }

            return result;
        }, [] as Piece[]);

        // Set the new pieces array
        setPieces(updatePieces);
        updatePossibleMoves();

        // Hide the modal
        modalRef.current?.classList.add('hidden');
    };

    return (
        <>
            <div className="pawn-promotion-modal hidden" ref={modalRef}>
                <div className="modal-body">
                    <img src={`/assets/image/Chess_r${promotionTeamType()}60.png`} alt=""
                        onClick={() => promotePawn(PieceType.ROOK)}
                    />
                    <img src={`/assets/image/Chess_b${promotionTeamType()}60.png`} alt=""
                        onClick={() => promotePawn(PieceType.BISHOP)} />
                    <img src={`/assets/image/Chess_n${promotionTeamType()}60.png`} alt=""
                        onClick={() => promotePawn(PieceType.KNIGHT)} />
                    <img src={`/assets/image/Chess_q${promotionTeamType()}60.png`} alt=""
                        onClick={() => promotePawn(PieceType.QUEEN)} />
                </div>
            </div>
            <Chessboard
                playMove={playMove}
                pieces={pieces}
            />
        </>
    );
}