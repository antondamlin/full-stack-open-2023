import React from 'react'
import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Displaying title and author but not likes and url', () => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { name: 'User_1' },
  }

  let mockLikeBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  const cont = render(
    <Blog blog={blog} addLike={mockLikeBlog} deleteBlog={mockDeleteBlog} />
  ).container
  const titleAndAuthor = blog.title + ' ' + blog.author
  const titleElement = cont.querySelector('.blogInfo')
  const expandedBlogInfo = cont.querySelector('.blogInfoExpanded')
  expect(titleElement).toHaveTextContent(titleAndAuthor)
  expect(expandedBlogInfo).toHaveStyle('display: none')
})

test('URL and Likes are shown when view button is clicked', async () => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { name: 'User_1' },
  }

  const user = userEvent.setup()
  let mockLikeBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  const cont = render(
    <Blog blog={blog} addLike={mockLikeBlog} deleteBlog={mockDeleteBlog} />
  ).container
  const button = screen.getByText('view')
  await user.click(button)
  const expandedBlogInfo = cont.querySelector('.blogInfoExpanded')
  expect(expandedBlogInfo).not.toHaveStyle('display: none')
})
