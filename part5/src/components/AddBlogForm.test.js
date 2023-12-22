import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlogForm'

test('clicking the button calls event handler once', async () => {
  const mockAddBlogHandler = jest.fn()

  const cont = render(<AddBlog addBlog={mockAddBlogHandler} />).container

  const user = userEvent.setup()
  const button = screen.getByText('create')
  const title = screen.getByTestId('title')
  const author = screen.getByTestId('author')
  const url = screen.getByTestId('url')
  await user.type(title, 'testing title')
  await user.type(author, 'testing author')
  await user.type(url, 'testing url')
  await user.click(button)
  const callContent = mockAddBlogHandler.mock.calls[0]
  expect(mockAddBlogHandler.mock.calls).toHaveLength(1)
  expect(callContent).toContain('testing title')
  expect(callContent).toContain('testing author')
  expect(callContent).toContain('testing url')
})
