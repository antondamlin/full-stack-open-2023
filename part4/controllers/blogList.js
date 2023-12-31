const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.status(200).json(allBlogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog)
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body
    try {
      const user = request.user
      if (!user) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch (exception) {
      next(exception)
    }
  }
)

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user
      if (!user) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const blogFromUser = await Blog.findById(request.params.id)
      if (blogFromUser.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        response
          .status(401)
          .json({ error: 'This user is not able to delete the selected blog' })
      }
    } catch (exception) {
      next(exception)
    }
  }
)

module.exports = blogRouter
