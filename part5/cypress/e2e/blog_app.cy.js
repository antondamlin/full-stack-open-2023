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

  describe("When logged in, single user", function () {
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
      cy.contains("Testing_Title testing_author");
    });

    it("User can like a blog", function () {
      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title");
      cy.get("#author").type("testing_author");
      cy.get("#url").type("testing_url");
      cy.get("#submit").click();
      cy.contains("Testing_Title testing_author");

      cy.get("#Testing_Title-viewButton").click();
      cy.get("#Testing_Title-likeButton").click();
      cy.contains("1");
    });

    it("User can delete a blog that they have created", function () {
      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title");
      cy.get("#author").type("testing_author");
      cy.get("#url").type("testing_url");
      cy.get("#submit").click();
      cy.contains("Testing_Title testing_author");

      cy.get("#Testing_Title-viewButton").click();
      cy.get("#Testing_Title-removeButton").click();
      cy.get("#landing").should("not.contain", "Testing_Title testing_author");
    });
  });

  describe("When logged in, multiple users", function () {
    beforeEach(function () {
      const newSecondUser = {
        name: "Testing_name2",
        username: "Testing_user2",
        password: "testing_pass2",
      };
      cy.request("POST", "http://localhost:3003/api/users/", newSecondUser);
      cy.visit("http://localhost:5173");
      cy.login({ username: "Testing_user", password: "testing_pass" });
    });

    it("User can only delete own blogs", function () {
      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_delete_Title");
      cy.get("#author").type("testing_delete_author");
      cy.get("#url").type("testing_delete_url");
      cy.get("#submit").click();
      cy.contains("Testing_delete_Title testing_delete_author");

      cy.get("#logout-button").click();
      cy.contains("Log in to application");
      cy.get("#username").type("Testing_user2");
      cy.get("#password").type("testing_pass2");
      cy.get("#loginButton").click();

      cy.contains("blogs");
      cy.get("#Testing_delete_Title-viewButton").click();
      cy.get("#Testing_delete_Title-removeButton").should("not.be.visible");
    });
  });

  describe("Blogs are sorted according to likes", function () {
    it("", function () {
      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title1");
      cy.get("#author").type("testing_author1");
      cy.get("#url").type("testing_url1");
      cy.get("#submit").click();
      cy.contains("Testing_delete_Title1 testing_delete_author1");

      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title2");
      cy.get("#author").type("testing_author2");
      cy.get("#url").type("testing_url2");
      cy.get("#submit").click();
      cy.contains("Testing_Title2 testing_author2");

      cy.contains("blogs");
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Testing_Title3");
      cy.get("#author").type("testing_author3");
      cy.get("#url").type("testing_url3");
      cy.get("#submit").click();
      cy.contains("Testing_Title3 testing_author3");

      cy.contains("The title with most likes").contains("view").click();
      cy.get("button").contains("like").click();
    });
  });
});
