const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

let headers = {};
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];
beforeEach(async () => {
  await User.deleteMany({});
  const initialUser = {
    username: "testing_user1",
    name: "testing_user2",
    password: "password_test",
  };

  await api.post("/api/users").send(initialUser);
  const response = await api.post("/api/login").send(initialUser);
  headers = {
    Authorization: `Bearer ${response.body.token}`,
  };
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const usersInDb = await User.find({});
  const user = usersInDb[0];
  const blogObjects = initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
        user: user.id.toString(),
      })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Blogs are properly formatted and stored", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are six blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(6);
  });

  test("the unique identifier property is named id", async () => {
    const response = await api.get("/api/blogs");
    const idObject = response.body;
    for (let i = 0; i < idObject.length; i++) {
      expect(idObject[i].id).toBeDefined();
    }
  });

  test("The value of likes defaults to zero when the likes value is missing from the added blog", async () => {
    const newBlog = {
      title: "New_Blog_Post3",
      author: "New_Author3",
      url: "url_adress3",
    };

    console.log();
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await Blog.find({});

    console.log(blogsInDb);
    const checkNewBlog = await blogsInDb.find(
      (blog) => blog.title === "New_Blog_Post3"
    );
    expect(checkNewBlog.likes).toBe(0);
  });
});

describe("Adding blogs works properly", () => {
  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "New_Blog_Post2",
      author: "New_Author2",
      url: "url_adress2",
      likes: 100,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await Blog.find({});
    expect(blogsInDb).toHaveLength(initialBlogs.length + 1);

    const titles = blogsInDb.map((blog) => blog.title);
    expect(titles).toContain("New_Blog_Post2");
  });

  test("If title is missing, the backend respond with the status code 400", async () => {
    const missingTitle = {
      author: "New_Author4",
      url: "url_adress4",
    };

    await api.post("/api/blogs").send(missingTitle).expect(400).set(headers);

    const blogsInDb = await Blog.find({});

    expect(blogsInDb).toHaveLength(initialBlogs.length);
  });

  test("If url is missing, the backend respond with the status code 400", async () => {
    const missingUrl = {
      title: "New_Blog_Post5",
      author: "New_Author5",
    };

    await api.post("/api/blogs").send(missingUrl).expect(400).set(headers);

    const blogsInDb = await Blog.find({});

    expect(blogsInDb).toHaveLength(initialBlogs.length);
  });
});

describe("Deleting blogs works properly", () => {
  test("Deleting blog post works as expected", async () => {
    const newBlog = {
      title: "New_Blog_Post6",
      author: "New_Author6",
      url: "url_adress6",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await Blog.find({});
    const addedBlog = blogsInDb.find((blog) => blog.title === newBlog.title);

    await api.delete(`/api/blogs/${addedBlog.id}`).expect(204).set(headers);

    const blogsAfterDelete = await Blog.find({});

    expect(blogsAfterDelete).toHaveLength(initialBlogs.length);

    const titlesAfterDelete = blogsAfterDelete.map((blog) => blog.title);

    expect(titlesAfterDelete).not.toContain(addedBlog.title);
  });
});

describe("Updating blogs works properly", () => {
  test("Blog entry is updated successfully when calling PUT api/blogs/:id", async () => {
    const newBlog = {
      title: "New_Blog_Post7",
      author: "New_Author7",
      url: "url_adress7",
      likes: 2,
    };

    await api.post("/api/blogs").send(newBlog).expect(201).set(headers);

    const blogsInDb = await Blog.find({});
    const updatingBlog = blogsInDb.find((blog) => blog.title === newBlog.title);

    const updatedNewBlog = {
      title: updatingBlog.title,
      author: updatingBlog.author,
      url: updatingBlog.url,
      likes: 7,
    };

    await api
      .put(`/api/blogs/${updatingBlog.id}`)
      .send(updatedNewBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAfterUpdate = await Blog.find({});
    expect(blogsAfterUpdate).toHaveLength(initialBlogs.length + 1);
    const updatedBlog = blogsAfterUpdate.find(
      (blog) => blog.title === "New_Blog_Post7"
    );
    expect(updatedBlog.likes).toBe(7);
  });
});

describe("Token-based authentication works properly", () => {
  test("Adding a blog fails with the proper status code 401 when wrong token provided", async () => {
    const newBlog = {
      title: "New_Blog_Post7",
      author: "New_Author7",
      url: "url_adress7",
      likes: 107,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .set({ Authorization: "Not Correct Token" })
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await Blog.find({});
    expect(blogsInDb).toHaveLength(initialBlogs.length);
    const titles = blogsInDb.map((blog) => blog.title);
    expect(titles).not.toContain("New_Blog_Post7");
  });

  test("Deleting a blog fails with the proper status code 401 when wrong token provided", async () => {
    const blogsInDbStart = await Blog.find({});
    await api
      .delete(`/api/blogs/${blogsInDbStart[0].id}`)
      .expect(401)
      .set({ Authorization: "Not Correct Token" });
    const blogsInDbAfter = await Blog.find({});
    expect(blogsInDbAfter).toHaveLength(initialBlogs.length);
    const titles = blogsInDbAfter.map((blog) => blog.title);
    expect(titles).toContain(blogsInDbStart[0].title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
