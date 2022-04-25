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

  it("front page can be opened", function () {
    cy.contains("log in to application")
  })

  it("Login form is shown", function () {
    cy.contains("log in to application")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click()
      cy.get("#username").type("cveklica123")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      cy.contains("Cveta Cveklic logged in")
    })

    it("fails with wrong credentials", function () {
      cy.contains("login").click()
      cy.get("#username").type("cveklica")
      cy.get("#password").type("pasword")
      cy.get("#login-button").click()

      cy.contains("wrong username or password")
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")

      cy.get("html").should("not.contain", "Cveta Cveklic logged in")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      cy.login({ username: "cveklica123", password: "password" })
    })

    it("A blog can be created", function () {
      cy.contains("create new blog").click()
      cy.get("#title").type("a blog created by cypress")
      cy.get("#author").type("cveta cveklic")
      cy.get("#url").type("www.cveklic.com")
      cy.get("#create-button").click()
      cy.contains("a blog created by cypress")
    })

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Decija pesmarica",
          author: "Zmaj",
          url: "www.google.com",
        })
      })

      it("a blog can be liked", function () {
        cy.get("#view-button").click()
        cy.get("#like-button").click()
      })
    })
  })
})
