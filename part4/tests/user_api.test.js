const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "testing_name", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersInDBStart = await User.find({});

    const newUser = {
      username: "Testing_name",
      name: "Testing",
      password: "Testing_Password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersInDBEnd = await User.find({});
    expect(usersInDBEnd).toHaveLength(usersInDBStart.length + 1);

    const users = usersInDBEnd.map((u) => u.username);
    expect(users).toContain(newUser.username);
  });

  describe("Invalid users are not created and application returns proper error message/code", () => {
    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersInDBStart = await User.find({});

      const newUser = {
        username: "testing_name",
        name: "testing",
        password: "testing_pass",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("expected `username` to be unique");

      const usersInDBEnd = await User.find({});
      expect(usersInDBEnd).toEqual(usersInDBStart);
    });

    test("Application do not create a user when password is shorter than 3 characters", async () => {
      const usersInDBStart = await User.find({});

      const newUser = {
        username: "testing_name1",
        name: "testing1",
        password: "te",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("password is too short or missing");
      const usersInDBEnd = await User.find({});
      expect(usersInDBEnd).toEqual(usersInDBStart);
    });

    test("Application do not create a user when username is shorter than 3 characters", async () => {
      const usersInDBStart = await User.find({});

      const newUser = {
        username: "te",
        name: "Testing2",
        password: "testing_password2",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3)."
      );
      const usersInDBEnd = await User.find({});
      expect(usersInDBEnd).toEqual(usersInDBStart);
    });
  });
});
