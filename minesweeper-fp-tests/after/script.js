import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
  markedTilesCount,
  positionMatch,
} from "./minesweeper.js"

let testBoard
if (process.env.NODE_ENV !== "production" && window.testBoard) {
  testBoard = window.testBoard
}
const BOARD_SIZE = testBoard?.length ?? 10
const NUMBER_OF_MINES = testBoard?.flat().filter(t => t.mine).length ?? 3

let board = testBoard ?? createBoard(BOARD_SIZE, getMinePositions())

const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

boardElement.style.setProperty("--size", BOARD_SIZE)
render()

function checkGameEnd() {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true })
    boardElement.addEventListener("contextmenu", stopProp, { capture: true })
  }

  if (win) {
    messageText.textContent = "You Win"
  }
  if (lose) {
    messageText.textContent = "You Lose"
    board.forEach(row => {
      row.forEach(tile => {
        if (tile.status === TILE_STATUSES.MARKED) board = markTile(tile)
        if (tile.mine) board = revealTile(board, tile)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

function render() {
  boardElement.innerHTML = ""
  checkGameEnd()

  getTileElements(board).forEach(element => {
    boardElement.append(element)
  })

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount(board)
}

boardElement.addEventListener("click", e => {
  if (!e.target.matches("[data-status]")) return

  board = revealTile(board, {
    x: parseInt(e.target.dataset.x),
    y: parseInt(e.target.dataset.y),
  })
  render()
})

boardElement.addEventListener("contextmenu", e => {
  if (!e.target.matches("[data-status]")) return

  e.preventDefault()
  board = markTile(board, {
    x: parseInt(e.target.dataset.x),
    y: parseInt(e.target.dataset.y),
  })
  render()
})

function getTileElements() {
  return board.flatMap(row => {
    return row.map(tileToElement)
  })
}

function tileToElement(tile) {
  const element = document.createElement("div")
  element.dataset.status = tile.status
  element.dataset.x = tile.x
  element.dataset.y = tile.y
  element.textContent = tile.adjacentMinesCount || ""
  return element
}

function getMinePositions(positions = []) {
  if (positions.length === NUMBER_OF_MINES) return positions
  const position = {
    x: randomNumber(BOARD_SIZE),
    y: randomNumber(BOARD_SIZE),
  }
  if (positions.some(positionMatch.bind(null, position))) {
    return getMinePositions(positions)
  } else {
    return getMinePositions([...positions, position])
  }
}

function randomNumber(size) {
  return Math.floor(Math.random() * size)
}
