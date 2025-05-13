import React, { useRef, useState } from "react";
import './Chessboard.css';
import Tile from "../Tile/Tile";
import { VERTICALAXIS, HORIZONTALAXIS, TILESIZE, PIECESIZE, OFFSET, samePosition } from "../../Constant";
import type { Position } from "../../Constant";
import type { Piece } from "../models/Piece";

interface Props {
    playMove: (piece: Piece, position: Position) => boolean;
    pieces?: Piece[];
}

export default function Chessboard({ playMove, pieces }: Props) {
    const chessBoardRef = useRef<HTMLDivElement>(null);
    const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
    const [activePieces, setActivePieces] = useState<HTMLElement | null>(null);

    const grabPieces = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        const chessBoard = chessBoardRef.current;
        if (element.classList.contains("chess-pieces") && chessBoard) {
            const rect = chessBoard.getBoundingClientRect();
            const grabX = Math.floor((e.clientX - rect.left) / TILESIZE);
            const grabY = Math.floor((rect.bottom - e.clientY) / TILESIZE);
            setGrabPosition({ x: grabX, y: grabY });

            const x = e.clientX - OFFSET;
            const y = e.clientY - OFFSET;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePieces(element);
        }
    };

    const movePieces = (e: React.MouseEvent) => {
        if (!activePieces || !chessBoardRef.current) return;
        const chessBoard = chessBoardRef.current;
        const rect = chessBoard.getBoundingClientRect();

        const updatePosition = () => {
            let x = e.clientX - OFFSET;
            let y = e.clientY - OFFSET;
            const minX = rect.left;
            const minY = rect.top;
            const maxX = rect.right - PIECESIZE;
            const maxY = rect.bottom - PIECESIZE;

            activePieces.style.position = "absolute";
            activePieces.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
            activePieces.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;
        };

        requestAnimationFrame(updatePosition);
    };

    const dropPieces = (e: React.MouseEvent) => {
        const chessBoard = chessBoardRef.current;
        if (activePieces && chessBoard) {
            const rect = chessBoard.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / TILESIZE);
            const y = Math.floor((rect.bottom - e.clientY) / TILESIZE);

            const snapX = rect.left + x * TILESIZE + (TILESIZE / 2) - OFFSET;
            const snapY = rect.top + (7 - y) * TILESIZE + (TILESIZE / 2) - OFFSET;

            activePieces.style.left = `${snapX}px`;
            activePieces.style.top = `${snapY}px`;

            const currentPiece = pieces?.find(p => samePosition(p.position, grabPosition));

            if (currentPiece) {
                const success = playMove(currentPiece, { x, y });
                if (!success) {
                    console.log("Invalid move:", currentPiece, { x, y });
                    activePieces.style.position = 'relative';
                    activePieces.style.removeProperty('top');
                    activePieces.style.removeProperty('left');
                }
            }
            setActivePieces(null);
        }
    };

    let board = [];
    for (let j = VERTICALAXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTALAXIS.length; i++) {
            const number = j + i + 2;
            const piece = pieces?.find((p) => samePosition(p.position, { x: i, y: j }));
            let image = piece ? piece.image : undefined;

            let currentPiece = activePieces != null ? pieces?.find(p => samePosition(p.position, grabPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => samePosition(p, { x: i, y: j })) : false;

            board.push(<Tile key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
        }
    }

    return (
        <div
            id="chessboard"
            onMouseDown={grabPieces}
            onMouseMove={movePieces}
            onMouseUp={dropPieces}
            ref={chessBoardRef}
        >
            {board}
        </div>
    );
}