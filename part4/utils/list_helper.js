const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach((post) => (likes += post.likes))
  return likes
}

const favoriteBlog = (blogs) => {
  const maxlikes = Math.max(...blogs.map((post) => post.likes))
  const returnObject = blogs.filter((post) => post.likes === maxlikes)
  if (returnObject.length > 0) {
    return returnObject[0]
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  const result = blogs.reduce((first, second) => {
    let author = first.find((blog) => {
      return blog.author === second.author
    })
    if (!author) {
      return first.concat({ author: second.author, blogs: 1 })
    }
    author.blogs += 1
    return first
  }, [])

  return result.reduce((first, second) =>
    first.blogs > second.blogs ? first : second
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
