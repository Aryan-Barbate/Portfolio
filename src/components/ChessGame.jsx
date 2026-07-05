import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
import { ChessPieces } from './ChessPieces';
import { RotateCcw } from 'lucide-react';

// Piece-Square Evaluation Tables to give the local fallback AI positional awareness
const PAWN_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5, 10, 25, 25, 10,  5,  5],
  [0,  0,  0, 20, 20,  0,  0,  0],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [5, 10, 10,-20,-20, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0]
];
const KNIGHT_TABLE = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50]
];
const BISHOP_TABLE = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20]
];
const ROOK_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [0,  0,  0,  5,  5,  0,  0,  0]
];
const QUEEN_TABLE = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [-5,  0,  5,  5,  5,  5,  0, -5],
  [0,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  5,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20]
];
const KING_TABLE = [
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [20, 20,  0,  0,  0,  0, 20, 20],
  [20, 30, 10,  0,  0, 10, 30, 20]
];

const LOCAL_STORAGE_KEY = 'portfolio.chess.score.v1';
const DEFAULT_SCORE = { wins: 0, losses: 0, draws: 0 };

const getInitialPieces = () => {
  const chess = new Chess();
  const board = chess.board();
  const list = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) {
        const sq = files[c] + (8 - r);
        list.push({
          id: `${p.color}${p.type.toUpperCase()}-${sq}`, // Unique permanent ID
          type: p.type,
          color: p.color,
          square: sq
        });
      }
    }
  }
  return list;
};

// Reconstruct pieces layer from the chess board, aligning IDs to preserve transitions
const syncPiecesFromBoard = (chess, prevPieces, lastMove) => {
  const board = chess.board();
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const newPieces = [];
  const matchedIds = new Set();

  const boardPieces = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) {
        boardPieces.push({
          square: files[c] + (8 - r),
          type: p.type,
          color: p.color
        });
      }
    }
  }

  const findMatch = (bp) => {
    // 1. Same square, type, and color (no move)
    let match = prevPieces.find(p => p.square === bp.square && p.type === bp.type && p.color === bp.color && !matchedIds.has(p.id));
    if (match) return match;

    // 2. Square corresponds to last move's target (moved piece)
    if (lastMove && bp.square === lastMove.to && bp.color === lastMove.color) {
      match = prevPieces.find(p => p.square === lastMove.from && p.color === bp.color && !matchedIds.has(p.id));
      if (match) return match;
    }

    // 3. Fallback: match any remaining unmatched piece of same color and type
    match = prevPieces.find(p => p.type === bp.type && p.color === bp.color && !matchedIds.has(p.id));
    if (match) return match;

    return null;
  };

  for (const bp of boardPieces) {
    const match = findMatch(bp);
    if (match) {
      matchedIds.add(match.id);
      newPieces.push({
        id: match.id,
        type: bp.type, // Use current type (handles promotions)
        color: bp.color,
        square: bp.square
      });
    } else {
      newPieces.push({
        id: `${bp.color}${bp.type.toUpperCase()}-${bp.square}-${Math.random().toString(36).substr(2, 4)}`,
        type: bp.type,
        color: bp.color,
        square: bp.square
      });
    }
  }

  return newPieces;
};

export default function ChessGame() {
  const gameRef = useRef(new Chess());
  const [gameState, setGameState] = useState(() => ({
    fen: gameRef.current.fen(),
    pieces: getInitialPieces()
  }));
  const [status, setStatus] = useState('your move.');
  const [score, setScore] = useState(DEFAULT_SCORE);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  
  const aiTimeoutRef = useRef(null);
  const hasUpdatedScore = useRef(false);

  // Clear pending AI moves on unmount
  useEffect(() => {
    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
    };
  }, []);

  // Load score from LocalStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setScore({
          wins: Number(parsed.wins) || 0,
          losses: Number(parsed.losses) || 0,
          draws: Number(parsed.draws) || 0,
        });
      }
    } catch (e) {
      console.error('Failed to load chess score', e);
    }
  }, []);

  // Save score to LocalStorage
  const updateScore = useCallback((newScore) => {
    setScore(newScore);
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newScore));
    } catch (e) {
      console.error('Failed to save chess score', e);
    }
  }, []);

  // Heuristic Board Evaluation (fallback AI)
  const evaluateBoard = (chessInstance) => {
    let scoreVal = 0;
    const board = chessInstance.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          let value = 0;
          const isWhite = piece.color === 'w';
          const tableRow = isWhite ? 7 - r : r;
          const tableCol = c;

          switch (piece.type) {
            case 'p':
              value = 100 + PAWN_TABLE[tableRow][tableCol];
              break;
            case 'n':
              value = 320 + KNIGHT_TABLE[tableRow][tableCol];
              break;
            case 'b':
              value = 330 + BISHOP_TABLE[tableRow][tableCol];
              break;
            case 'r':
              value = 500 + ROOK_TABLE[tableRow][tableCol];
              break;
            case 'q':
              value = 900 + QUEEN_TABLE[tableRow][tableCol];
              break;
            case 'k':
              value = 20000 + KING_TABLE[tableRow][tableCol];
              break;
            default:
              value = 0;
          }
          scoreVal += isWhite ? -value : value; // White minimizing, Black maximizing
        }
      }
    }
    return scoreVal;
  };

  // Minimax with Alpha-Beta Pruning (fallback AI)
  const minimax = (chessInstance, depth, alpha, beta, isMaximizing) => {
    if (depth === 0 || chessInstance.isGameOver()) {
      return evaluateBoard(chessInstance);
    }

    const moves = chessInstance.moves({ verbose: true });
    moves.sort((a, b) => {
      const aScore = (a.captured ? 10 : 0) + (a.promotion ? 5 : 0);
      const bScore = (b.captured ? 10 : 0) + (b.promotion ? 5 : 0);
      return bScore - aScore;
    });

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        chessInstance.move(move);
        const evalVal = minimax(chessInstance, depth - 1, alpha, beta, false);
        chessInstance.undo();
        maxEval = Math.max(maxEval, evalVal);
        alpha = Math.max(alpha, evalVal);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        chessInstance.move(move);
        const evalVal = minimax(chessInstance, depth - 1, alpha, beta, true);
        chessInstance.undo();
        minEval = Math.min(minEval, evalVal);
        beta = Math.min(beta, evalVal);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const getBestMove = (chessInstance, color) => {
    const moves = chessInstance.moves({ verbose: true });
    if (moves.length === 0) return null;

    let bestMove = null;
    const isMaximizing = color === 'b';
    let bestValue = isMaximizing ? -Infinity : Infinity;
    
    moves.sort((a, b) => {
      const aScore = (a.captured ? 10 : 0) + (a.promotion ? 5 : 0);
      const bScore = (b.captured ? 10 : 0) + (b.promotion ? 5 : 0);
      return bScore - aScore;
    });

    const depth = 2;

    for (const move of moves) {
      chessInstance.move(move);
      const boardValue = minimax(chessInstance, depth - 1, -Infinity, Infinity, !isMaximizing);
      chessInstance.undo();
      
      if (isMaximizing) {
        if (boardValue > bestValue) {
          bestValue = boardValue;
          bestMove = move;
        }
      } else {
        if (boardValue < bestValue) {
          bestValue = boardValue;
          bestMove = move;
        }
      }
    }
    return bestMove;
  };

  const getStatusText = (chess) => {
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? 'mate. I win! rematch?' : 'mate. gg, you got me!';
    }
    if (chess.isStalemate()) return 'stalemate. nobody wins.';
    if (chess.isInsufficientMaterial()) return 'draw - not enough pieces.';
    if (chess.isThreefoldRepetition()) return "draw - we're going in circles.";
    if (chess.isDraw()) return 'draw. honourable.';
    if (chess.inCheck()) {
      return chess.turn() === 'w' ? 'check. careful now.' : 'check. oops, my bad.';
    }
    return chess.turn() === 'w' ? 'your move.' : 'thinking...';
  };

  // Handle Game Over Score Updating
  const checkGameOverScore = useCallback((chess) => {
    if (!chess.isGameOver() || hasUpdatedScore.current) return;
    hasUpdatedScore.current = true;
    
    const newScore = { ...score };
    if (chess.isCheckmate()) {
      if (chess.turn() === 'w') {
        newScore.losses += 1;
      } else {
        newScore.wins += 1;
      }
    } else {
      newScore.draws += 1;
    }
    updateScore(newScore);
  }, [score, updateScore]);

  // Atomic state updates to apply moves (ensures FEN and pieces update together)
  const commitMove = useCallback((moveResult) => {
    setGameState(prev => {
      const nextPieces = syncPiecesFromBoard(gameRef.current, prev.pieces, moveResult);
      return {
        fen: gameRef.current.fen(),
        pieces: nextPieces
      };
    });
    setStatus(getStatusText(gameRef.current));
    setSelectedSquare(null);
    setPossibleMoves([]);
    checkGameOverScore(gameRef.current);
  }, [checkGameOverScore]);

  // AI Move Runner (Queries Stockfish API, falls back to local minimax)
  const makeAIMove = useCallback(async () => {
    const chess = gameRef.current;
    if (chess.isGameOver() || chess.turn() !== 'b') return;

    setStatus('thinking... (stockfish)');
    const currentFen = chess.fen();
    let apiSuccess = false;

    try {
      const response = await fetch("https://chess-api.com/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen: currentFen, depth: 10 })
      });
      const data = await response.json();
      
      // Strict state verification: only apply move if the game has not been reset or mutated
      if (chess.fen() === currentFen && data.from && data.to) {
        const moveResult = chess.move({
          from: data.from,
          to: data.to,
          promotion: 'q'
        });
        commitMove(moveResult);
        apiSuccess = true;
      }
    } catch (e) {
      console.error("Stockfish API failed, falling back to local engine", e);
    }

    // Strict state verification check
    if (chess.fen() !== currentFen) return;

    // Local minimax fallback (only runs if the API call failed to submit a move)
    if (!apiSuccess) {
      const bestMove = getBestMove(chess, 'b');
      if (bestMove) {
        const moveResult = chess.move({
          from: bestMove.from,
          to: bestMove.to,
          promotion: bestMove.promotion || 'q'
        });
        commitMove(moveResult);
      }
    }
  }, [checkGameOverScore, commitMove]);

  // Player Move Handler
  const makeMove = useCallback((from, to) => {
    const chess = gameRef.current;
    if (chess.turn() !== 'w' || chess.isGameOver()) return false;

    try {
      const moveResult = chess.move({ from, to, promotion: 'q' });
      if (!moveResult) return false;
      
      commitMove(moveResult);

      if (!chess.isGameOver()) {
        // Clear any previous AI timeout before scheduling the next one
        if (aiTimeoutRef.current) {
          clearTimeout(aiTimeoutRef.current);
        }
        aiTimeoutRef.current = setTimeout(makeAIMove, 400);
      }
      return true;
    } catch (e) {
      return false;
    }
  }, [makeAIMove, commitMove]);

  // Square Click Handler
  const handleSquareClick = (square) => {
    const chess = gameRef.current;
    if (chess.turn() !== 'w' || chess.isGameOver()) return;

    const piece = chess.get(square);

    // If a possible target square is clicked
    if (possibleMoves.includes(square)) {
      makeMove(selectedSquare, square);
      return;
    }

    // Select piece
    if (piece && piece.color === 'w') {
      setSelectedSquare(square);
      const moves = chess.moves({ square, verbose: true });
      setPossibleMoves(moves.map(m => m.to));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  // Reset Game
  const handleRestart = () => {
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
      aiTimeoutRef.current = null;
    }
    gameRef.current = new Chess();
    hasUpdatedScore.current = false;
    setGameState({
      fen: gameRef.current.fen(),
      pieces: getInitialPieces()
    });
    setStatus('fresh board. your move.');
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  // Render Chessboard Squares grid (handles highlights/dots)
  const renderBoardSquares = () => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = [];

    for (let r = 0; r < 8; r++) {
      const cols = [];
      for (let c = 0; c < 8; c++) {
        const squareName = `${files[c]}${8 - r}`;
        const isDark = (r + c) % 2 === 1;
        
        // Highlight states
        const isSelected = selectedSquare === squareName;
        const isPossible = possibleMoves.includes(squareName);
        const hasPiece = gameRef.current.get(squareName);
        
        // King in check highlight
        const isCheckHighlight = hasPiece && hasPiece.type === 'k' && hasPiece.color === gameRef.current.turn() && gameRef.current.inCheck();

        let squareClass = 'chess-square';
        if (isDark) squareClass += ' chess-square-dark';
        else squareClass += ' chess-square-light';
        if (isSelected) squareClass += ' chess-square-selected';
        if (isCheckHighlight) squareClass += ' chess-square-check';

        cols.push(
          <div
            key={squareName}
            className={squareClass}
            onClick={() => handleSquareClick(squareName)}
          >
            {isPossible && (
              <div className={hasPiece ? 'chess-move-capture' : 'chess-move-dot'} />
            )}
          </div>
        );
      }
      rows.push(
        <div key={`row-${r}`} className="chess-board-row">
          {cols}
        </div>
      );
    }
    return rows;
  };

  // Render absolute positioned piece icons with transform transition styles
  const renderPieces = () => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return gameState.pieces.map(p => {
      const fIdx = files.indexOf(p.square[0]);
      const rIdx = 8 - parseInt(p.square[1], 10);
      
      const PieceComponent = ChessPieces[`${p.color}${p.type.toUpperCase()}`];
      if (!PieceComponent) return null;

      const left = fIdx * 12.5;
      const top = rIdx * 12.5;

      return (
        <div
          key={p.id}
          className="chess-piece-transition-wrap"
          style={{
            position: 'absolute',
            width: '12.5%',
            height: '12.5%',
            left: `${left}%`,
            top: `${top}%`,
            zIndex: 1,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.28s cubic-bezier(0.25, 1, 0.5, 1), top 0.28s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          <div style={{ width: '85%', height: '85%' }}>
            <PieceComponent className="chess-piece-wrapper" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="chess-card">
      <div className="chess-header">
        <span className="chess-header-title">vs stockfish engine</span>
        <button type="button" onClick={handleRestart} className="chess-restart-btn" aria-label="Restart game">
          <RotateCcw size={11} className="chess-restart-icon" />
          <span>restart</span>
        </button>
      </div>

      <div className="chess-board-container">
        <div className="chess-board" style={{ position: 'relative' }}>
          {renderBoardSquares()}
          {renderPieces()}
        </div>
      </div>

      <div className="chess-footer">
        <span className="chess-status-text">{status}</span>
        <span className="chess-score" title="wins · losses · draws">
          <span className="chess-score-val chess-wins">{score.wins}</span>
          <span className="chess-score-sep"> · </span>
          <span className="chess-score-val chess-losses">{score.losses}</span>
          <span className="chess-score-sep"> · </span>
          <span className="chess-score-val chess-draws">{score.draws}</span>
        </span>
      </div>
    </div>
  );
}
