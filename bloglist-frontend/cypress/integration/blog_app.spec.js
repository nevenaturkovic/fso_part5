describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("log in to application")
  })


  it("user can log in", function () {
    cy.contains("login").click()
    cy.get("#username").type("cveklica123")
    cy.get("#password").type("password")
    cy.get("#login-button").click()

    cy.contains("Cveta Cveklic logged in")
  })
})
