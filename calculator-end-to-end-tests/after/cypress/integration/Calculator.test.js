describe("calculator", () => {
  beforeEach(() => {
    cy.visitHome()
  })

  it("correctly handles normal calculations", () => {
    cy.getCalculatorButton("4").click()
    cy.getCalculatorButton(".").click()
    cy.getCalculatorButton("1").click()
    cy.get(".primary-operand").should("have.text", "4.1")
    cy.getCalculatorButton("+").click()
    cy.get(".primary-operand").should("have.text", "0")
    cy.get(".secondary-operand").should("have.text", "4.1")
    cy.get('.history > [data-operation=""]').should("have.text", "+")
    cy.getCalculatorButton("6").click()
    cy.get(".primary-operand").should("have.text", "6")
    cy.getCalculatorButton("=").click()
    cy.get(".primary-operand").should("have.text", "10.1")
    cy.get(".secondary-operand").should("have.text", "")
    cy.get('.history > [data-operation=""]').should("have.text", "")
  })

  it("correctly handles all clear", () => {
    cy.getCalculatorButton("4").click()
    cy.getCalculatorButton("+").click()
    cy.getCalculatorButton("6").click()
    cy.getCalculatorButton("AC").click()
    cy.get(".primary-operand").should("have.text", "0")
    cy.get(".secondary-operand").should("have.text", "")
    cy.get('.history > [data-operation=""]').should("have.text", "")
  })

  it("correctly handles delete", () => {
    cy.getCalculatorButton("4").click()
    cy.getCalculatorButton("4").click()
    cy.getCalculatorButton("2").click()
    cy.getCalculatorButton("DEL").click()
    cy.get(".primary-operand").should("have.text", "44")
    cy.get(".secondary-operand").should("have.text", "")
    cy.get(".history > [data-operation]").should("have.text", "")
  })
})
