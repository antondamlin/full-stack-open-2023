const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const noteObjects = initialBlogs.map((note) => new Blog(note))
  const promiseArray = noteObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})

test('the unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const idObject = response.body
  for (let i = 0; i < idObject.length; i++) {
    expect(idObject[i].id).toBeDefined()
  }
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'New_Blog_Post2',
    author: 'New_Author2',
    url: 'url_adress2',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await Blog.find({})
  expect(blogsInDb).toHaveLength(initialBlogs.length + 1)

  const titles = blogsInDb.map((blog) => blog.title)
  expect(titles).toContain('New_Blog_Post2')
})

test('The value of likes defaults to zero when the likes value is missing from the added blog', async () => {
  const newBlog = {
    title: 'New_Blog_Post3',
    author: 'New_Author3',
    url: 'url_adress3',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await Blog.find({})

  console.log(blogsInDb)
  const checkNewBlog = await blogsInDb.find(
    (blog) => blog.title === 'New_Blog_Post3'
  )
  expect(checkNewBlog.likes).toBe(0)
})

test('If title is missing, the backend respond with the status code 400', async () => {
  const missingTitle = {
    author: 'New_Author4',
    url: 'url_adress4',
  }

  await api.post('/api/blogs').send(missingTitle).expect(400)

  const blogsInDb = await Blog.find({})

  expect(blogsInDb).toHaveLength(initialBlogs.length)
})

test('If url is missing, the backend respond with the status code 400', async () => {
  const missingUrl = {
    title: 'New_Blog_Post5',
    author: 'New_Author5',
  }

  await api.post('/api/blogs').send(missingUrl).expect(400)

  const blogsInDb = await Blog.find({})

  expect(blogsInDb).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
