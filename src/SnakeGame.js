import React, { useEffect, useRef, useState } from 'react';

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const scale = 20;
        const rows = canvas.height / scale;
        const columns = canvas.width / scale;

        let snake = [
            { x: 10, y: 10 },
        ];
        let food = { x: 15, y: 15 };
        let direction = 'RIGHT';
        let gameLoop;

        const drawSnake = () => {
            ctx.fillStyle = '#4CAF50';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
            });
        };

        const drawFood = () => {
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
        };

        const moveSnake = () => {
            const head = { ...snake[0] };
            switch (direction) {
                case 'UP': head.y--; break;
                case 'DOWN': head.y++; break;
                case 'LEFT': head.x--; break;
                case 'RIGHT': head.x++; break;
                default: break;
            }
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                setScore(prevScore => prevScore + 1);
                food = {
                    x: Math.floor(Math.random() * columns),
                    y: Math.floor(Math.random() * rows)
                };
            } else {
                snake.pop();
            }
        };

        const checkCollision = () => {
            const head = snake[0];
            if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
                endGame();
            }
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    endGame();
                }
            }
        };

        const gameUpdate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFood();
            moveSnake();
            drawSnake();
            checkCollision();
        };

        const endGame = () => {
            setGameOver(true);
            setIsPlaying(false);
            clearInterval(gameLoop);
        };

        const handleKeyPress = (e) => {
            if (isPlaying) {
                switch (e.key) {
                    case 'ArrowUp': if (direction !== 'DOWN') direction = 'UP'; break;
                    case 'ArrowDown': if (direction !== 'UP') direction = 'DOWN'; break;
                    case 'ArrowLeft': if (direction !== 'RIGHT') direction = 'LEFT'; break;
                    case 'ArrowRight': if (direction !== 'LEFT') direction = 'RIGHT'; break;
                    default: break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        if (isPlaying) {
            gameLoop = setInterval(gameUpdate, 100);
        }

        return () => {
            clearInterval(gameLoop);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isPlaying]);

    const startGame = () => {
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
    };

    return (
        <div className="snake-game">
            <div className="game-console">
                <canvas ref={canvasRef} width="600" height="400" />
            </div>
            <div className="game-info">
                <p>Score: {score}</p>
                {gameOver && <p>Game Over!</p>}
                {!isPlaying && (
                    <button onClick={startGame}>
                        {gameOver ? 'Jugar de nuevo' : 'Comenzar'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SnakeGame;
