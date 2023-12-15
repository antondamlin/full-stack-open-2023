const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((post) => (likes += post.likes));
  return likes;
};

const favoriteBlog = (blogs) => {
  const maxlikes = Math.max(...blogs.map((post) => post.likes));
  const returnObject = blogs.filter((post) => post.likes === maxlikes);
  if (returnObject.length > 0) {
    return returnObject[0];
  } else {
    return {};
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
