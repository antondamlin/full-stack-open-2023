describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      name: "Testing_name",
      username: "Testing_user",
      password: "testing_pass",
    };
    cy.request("POST", "http://localhost:3003/api/users/", newUser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Testing_user");
      cy.get("#password").type("testing_pass");
      cy.get("#loginButton").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("Testing_user");
      cy.get("#password").type("testing_pa");
      cy.get("#loginButton").click();
      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Testing_user", password: "testing_pass" });
    });

    it("A blog can be created", function () {
      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title");
      cy.get("#author").type("testing_author");
      cy.get("#url").type("testing_url");
      cy.get("#submit").click();
      cy.contains("Testing_Title");
    });

    it("User can like a blog", function () {
      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title");
      cy.get("#author").type("testing_author");
      cy.get("#url").type("testing_url");
      cy.get("#submit").click();
      cy.contains("Testing_Title");

      cy.get("#viewButton").click();
      cy.get("#likeButton").click();
      cy.contains("1");
    });
  });
});
