const canvasEl = document.getElementById("gameCanvas");
const scoreEL = document.getElementById("score");
const canvasContext = canvasEl.getContext("2d");
const gridSize = 20;
const cols = canvasEl.width / gridSize;
const rows = canvasEl.height / gridSize;

let snake = [{ x: 9, y: 9 }];

const generateFood = () => ({
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
})

let food = generateFood();
let direction = { x: 0, y: 0 };
let newDirection = { x: 0, y: 0 };
let score = 0;

const render = () => {
  if (checkCollision()) {
    alert(`Game Over! Your score is: ${score}`);
    resetGame();
    return;
};

  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };
  direction = newDirection;

  if(newHead.x === food.x && newHead.y === food.y) {
    score++;
    scoreEL.innerHTML = `Score: ${score}`;
    food = generateFood()
  } else {
    snake.pop()
  };

  snake.unshift(newHead);
  draw();
}

const checkCollision = () => {
  const [head, ...body] = snake;
  const wallCollide = head.x < 0 || head.x >= cols || head.y < 0;
  const snakeCollide = body.some(part => part.x === head.x && part.y == head.y);
  return wallCollide || snakeCollide
}
const changeDirection = ({key}) => {
  if (key === 'ArrowUp' && direction.y === 0) newDirection = { x: 0, y: -1 };
  if (key === 'ArrowDown' && direction.y === 0) newDirection = { x: 0, y: 1 }
  if (key === 'ArrowLeft' && direction.x === 0) newDirection = { x: -1, y: 0 };
  if (key === 'ArrowRight' && direction.x === 0) newDirection = { x: 1, y: 0 };
};

const draw = () => {
  canvasContext.clearRect(0,0,canvasEl.width, canvasEl.height);
  drawFood(canvasContext);
  drawSnake(canvasContext);
}

const drawSnake = (canvasContext) => {
  canvasContext.fillStyle = "green";
  snake.forEach(part => {
    canvasContext.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize)
  })
}

const drawFood = (canvasContext) => {
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize)
}

const resetGame = () => {
  snake = [{ x: 9, y: 9 }]
  food = generateFood();
  direction = { x: 0, y: 0 };
  newDirection = { x: 0, y: 0 };
  score = 0;
  scoreEL.innerHTML = `Score: ${score}` 
}

document.addEventListener('keydown', changeDirection);
setInterval(render,100)