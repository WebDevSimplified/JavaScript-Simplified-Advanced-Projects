import { TILE_STATUSES } from "../../minesweeper"

describe("user left clicks on tile", () => {
  describe("when the tile is not a mine", () => {
    it("reveals itself and displays the number of mines", () => {
      const board = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]
      cy.visitBoard(board)
      cy.get('[data-x="0"][data-y="0"]').click()
      cy.get('[data-x="0"][data-y="0"]').should("have.text", "1")
    })
  })

  describe("when the tile is a mine", () => {
    it("reveals itself and displays the number of mines", () => {
      const board = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]
      cy.visitBoard(board)

      // Click mine
      cy.get('[data-x="0"][data-y="1"]').click()
      cy.get('[data-x="0"][data-y="1"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MINE
      )

      // Reveal other mines
      cy.get('[data-x="1"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MINE
      )

      // Lose text
      cy.get(".subtext").should("have.text", "You Lose")

      // Ensure no input allowed
      cy.get('[data-x="0"][data-y="0"]').click()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.HIDDEN
      )
    })
  })
})

describe("user rights clicks on tile", () => {
  describe("when the tile is not marked", () => {
    it("marks itself", () => {
      const board = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]
      cy.visitBoard(board)
      cy.get('[data-x="0"][data-y="0"]').rightclick()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MARKED
      )
    })
  })

  describe("when the tile is marked", () => {
    it("marks itself", () => {
      const board = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]
      cy.visitBoard(board)
      cy.get('[data-x="0"][data-y="0"]').rightclick()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.HIDDEN
      )
    })
  })
})
