describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Cveta Cveklic",
      username: "cveklica123",
      password: "password",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click()
      cy.get("input:first").type("cveklica123")
      cy.get("input:last").type("password")
      cy.get("#login-button").click()
    })

    it("a new note can be created", function () {
      // ...
    })
  })
})
