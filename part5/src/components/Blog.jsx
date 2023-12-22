import { useState } from "react";

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false);
  const [buttonText, setButtonText] = useState("view");
  const show = { display: visible ? "" : "none" };

  const handleViewChange = () => {
    const buttonText = !visible ? "hide" : "view";
    setVisible(!visible);
    setButtonText(buttonText);
  };

  const handleAddLike = () => {
    const newBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    addLike(newBlog, blog.id);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleViewChange}>{buttonText}</button>
      </div>
      <div style={show}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleAddLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
