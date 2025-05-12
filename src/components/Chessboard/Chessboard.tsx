import React, { useRef, useState } from "react";
import './Chessboard.css';
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";
import { VERTICALAXIS, HORIZONTALAXIS, PieceType, TeamType, initialBoardState, TILESIZE, PIECESIZE, OFFSET, samePosition } from "../../Constant";
import type { Pieces, Position } from "../../Constant";
const referee = new Referee()

interface Props {
    getPossibleMoves: () => Position[]
    playMove: () => void
}
export default function Chessboard({ getPossibleMoves, playMove }: Props) {

    const chessBoardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Pieces[]>(initialBoardState);
    const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 })
    const [activePieces, setActivePieces] = useState<HTMLElement | null>(null);
    const [promotionPawn, setPromotionPawn] = useState<Pieces>()
    const modaRef = useRef<HTMLDivElement>(null)

    const updateValidMoves = () => {
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = referee.getValidMoves(p, currentPieces)
                return p
            })
        })
    }

    const grabPieces = (e: React.MouseEvent) => {
        updateValidMoves()
        let element = e.target as HTMLElement;
        const chessBoard = chessBoardRef.current;
        if (element.classList.contains("chess-pieces") && chessBoard) {
            //vị trí ban đầu
            let grabX = Math.floor((e.clientX - chessBoard.offsetLeft) / TILESIZE)
            let grabY = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 600) / TILESIZE))
            setGrabPosition({
                x: grabX,
                y: grabY
            })

            let x = e.clientX - OFFSET;
            let y = e.clientY - OFFSET;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePieces(element)
        }
    };

    const movePieces = (e: React.MouseEvent) => {
        const chessBoard = chessBoardRef.current;
        if (activePieces && chessBoard) {
            let minX = chessBoard.offsetLeft;
            let minY = chessBoard.offsetTop;
            let maxX = chessBoard.offsetLeft + chessBoard.clientWidth - PIECESIZE;
            let maxY = chessBoard.offsetTop + chessBoard.clientHeight - PIECESIZE;
            let x = e.clientX - OFFSET;
            let y = e.clientY - OFFSET;
            activePieces.style.position = "absolute";
            if (x < minX) {
                activePieces.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePieces.style.left = `${maxX}px`;
            } else {
                activePieces.style.left = `${x}px`;
            }

            if (y < minY) {
                activePieces.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePieces.style.top = `${maxY}px`;
            } else {
                activePieces.style.top = `${y}px`;
            }
        }
    };

    const dropPieces = (e: React.MouseEvent) => {
        const chessBoard = chessBoardRef.current;
        if (activePieces && chessBoard) {
            //vị trí đích của quân cờ
            const x = Math.floor((e.clientX - chessBoard.offsetLeft) / TILESIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 600) / TILESIZE));

            const snapX = chessBoard.offsetLeft + x * TILESIZE + (TILESIZE / 2) - OFFSET; // Thêm snapX
            const snapY = chessBoard.offsetTop + y * TILESIZE + (TILESIZE / 2) - OFFSET; // Thêm snapY

            activePieces.style.left = `${snapX}px`;
            activePieces.style.top = `${snapY}px`;

            const currentPiece = pieces.find(p => samePosition(p.position, grabPosition))

            if (currentPiece) {
                const validMove = referee.isValidMove(grabPosition, { x, y }, currentPiece.type, currentPiece.team, pieces)
                const isEnpassant = referee.isEnPassantMove(grabPosition, { x, y }, pieces, currentPiece.type, currentPiece.team)
                const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1

                if (isEnpassant) {
                    const updatePieces = pieces.reduce((result, piece) => {
                        // Cập nhật vị trí quân cờ hiện tại
                        if (samePosition(piece.position, grabPosition)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            result.push(piece);
                        }
                        // Bỏ qua quân cờ bị ăn (en passant)
                        else if (!(samePosition(piece.position, { x, y: y - pawnDirection }))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            result.push(piece);
                        }
                        return result;
                    }, [] as Pieces[]);
                    setPieces(updatePieces);
                }
                else if (validMove) {
                    //  UPDATE THE PIECE MOVEMENT
                    // AND IF THE PIECE IS ATTACKED , REMOVE IT
                    const updatePieces = pieces.reduce((result, piece) => {
                        if (samePosition(piece.position, grabPosition)) {
                            if (Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN) {
                                //SPECIAL MOVE
                                piece.enPassant = true;
                            } else {
                                piece.enPassant = false;
                            }
                            piece.position.x = x;
                            piece.position.y = y;

                            let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0
                            if (y === promotionRow && piece.type === PieceType.PAWN) {
                                setPromotionPawn(piece)
                                modaRef.current?.classList.remove('hidden')
                            }
                            result.push(piece);
                        } else if (!(samePosition(piece.position, { x, y }))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            result.push(piece);
                        }
                        return result
                    }, [] as Pieces[])
                    setPieces(updatePieces)

                } else {
                    activePieces.style.position = 'relative';
                    activePieces.style.removeProperty('top');
                    activePieces.style.removeProperty('left');
                }
            }
            setActivePieces(null)
        }
    };

    let board = [];
    for (let j = VERTICALAXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTALAXIS.length; i++) {
            const number = j + i + 2;
            let image = undefined;
            pieces.forEach(item => {
                if (samePosition(item.position, { x: i, y: j })) {
                    image = item.image;
                }
            });
            let currentPiece = activePieces != null ? pieces.find(p => samePosition(p.position, grabPosition)) : undefined
            let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => samePosition(p, { x: i, y: j })) : false
            board.push(
                <Tile
                    key={`${j}.${i}`}
                    number={number}
                    image={image}
                    highlight={highlight}
                />
            );
        }
    }

    const promotionTeamType = () => {
        return promotionPawn?.team === TeamType.OUR ? 'lt' : 'dt'
    }

    const promotePawn = (type: PieceType) => {
        if (promotionPawn === undefined) {
            return
        }
        const updatePieces = pieces.reduce((result, piece) => {
            if (samePosition(piece.position, promotionPawn?.position)) {
                piece.type = type
                const teamType = piece.team === TeamType.OUR ? "lt" : 'dt'
                let image = ''
                switch (type) {
                    case PieceType.ROOK:
                        image = 'r'
                        break
                    case PieceType.BISHOP:
                        image = 'b'
                        break
                    case PieceType.KNIGHT:
                        image = 'n'
                        break
                    case PieceType.QUEEN:
                        image = 'q'
                        break
                    default:
                        break
                }
                piece.image = `assets/image/Chess_${image}${teamType}60.png`

            }
            result.push(piece)
            return result
        }, [] as Pieces[])
        setPieces(updatePieces)
        modaRef.current?.classList.add('hidden')
    }

    return (
        <>
            <div className="pawn-promotion-modal hidden" ref={modaRef}>
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
            <div id="chessboard"
                onMouseDown={(e) => grabPieces(e)}
                onMouseMove={(e) => movePieces(e)}
                onMouseUp={(e) => dropPieces(e)}
                ref={chessBoardRef}
            >
                {board}
            </div>
        </>
    );
}