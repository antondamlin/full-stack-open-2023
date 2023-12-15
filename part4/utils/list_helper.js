const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((post) => (likes += post.likes));
  return likes;
};

module.exports = {
  dummy,
  totalLikes,
};
