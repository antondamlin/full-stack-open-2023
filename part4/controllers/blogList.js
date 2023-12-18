const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({})
    response.status(200).json(allBlogs)
    console.log(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
