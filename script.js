const gameScreen = document.querySelector('.game-screen__grid-wrapper')
let gameIsStarted = false
let snake = {
  direction: 'up',
  elements: []
}

let matrix = []

const createMatrix = () => {
  for (let i = 0; i < 400; i++) {
    const circle = document.createElement('div')
    circle.id = i
    gameScreen.appendChild(circle)
  }
}

const transparentMatrix = () => {
  const allCircles = document.querySelectorAll('.game-screen__grid-wrapper > *')
  allCircles.forEach(cirle => cirle.classList.add('transparent'))
}

transparentMatrix()

const message = (msg) => {
  gameScreen.innerHTML = msg
  gameScreen.classList.add('message')
}

const onKeyDown = e => {
  if(e.code === 'Enter') {
    startGame()
  } else if (e.code === 'ArrowUp') {
    snake.direction = 'up'
  } else if (e.code === 'ArrowDown') {
    snake.direction = 'down'
  } else if (e.code === 'ArrowLeft') {
    snake.direction = 'left'
  } else if (e.code === 'ArrowRight') {
    snake.direction = 'right'
  }
}

const onTouch = e => {
  startGame()
}

const startGame = () => {
  if(gameIsStarted === false) {
    gameIsStarted = true
    gameScreen.classList.remove('message')
    gameScreen.innerHTML = ''
    createMatrix()
    readMatrix()
    matrix[10][10].classList.add('head')
  }
}

document.addEventListener('keydown', onKeyDown)
gameScreen.addEventListener('touchend', onTouch)


message('Нажми <br> \'Enter\' или тапни <br> для игры')

const readMatrix = () => {
  let matrixStoke = []
  let id = 0
  const circles = document.querySelectorAll('.game-screen__grid-wrapper > *')
  matrix = []
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      matrixStoke.push(circles[id])
      id++
    }
    matrix.push(matrixStoke)
    matrixStoke = []
  }
}

const writeMatrix = () => {
}

setInterval(() => {
  if(gameIsStarted === true) {
    let hX, hY
    for (let y = 0; y < 20; y++) {
      if(!hX && !hY){
        for (let x = 0; x < 20; x++) {
          if(matrix[y][x].classList.contains('head')) {
            hX = x
            hY = y
          }
        }
      }
    }
    if(snake.direction === 'up') {
      matrix[hY][hX].classList.remove(...matrix[hY][hX].classList)
      hY--
      if(hY === -1) {
        hY = 19
      }
      matrix[hY][hX].classList.add('head')
    } else if(snake.direction === 'down') {
      matrix[hY][hX].classList.remove(...matrix[hY][hX].classList)
      hY++
      if(hY === 20) {
        hY = 0
      }
      matrix[hY][hX].classList.add('head')
    } else if(snake.direction === 'left') {
      matrix[hY][hX].classList.remove(...matrix[hY][hX].classList)
      hX--
      if(hX === -1) {
        hX = 19
      }
      matrix[hY][hX].classList.add('head')
    } else if(snake.direction === 'right') {
      matrix[hY][hX].classList.remove(...matrix[hY][hX].classList)
      hX++
      if(hX === 20) {
        hX = 0
      }
      matrix[hY][hX].classList.add('head')
    }
  }
}, 250)