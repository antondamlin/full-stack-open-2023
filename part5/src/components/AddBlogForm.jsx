import React, { useState } from "react";

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blogFormVisible, setblogFormVisible] = useState(false);

  const hide = { display: blogFormVisible ? "none" : "" };
  const show = { display: blogFormVisible ? "" : "none" };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog(title, author, url);
    setAuthor("");
    setUrl("");
    setTitle("");
  };

  return (
    <div>
      <div style={hide}>
        <button onClick={() => setblogFormVisible(true)}>new blog</button>
      </div>
      <h2>create new</h2>
      <div style={show}>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input value={title} onChange={handleTitleChange} />
          </div>
          <div>
            author: <input value={author} onChange={handleAuthorChange} />
          </div>
          <div>
            url:
            <input value={url} onChange={handleUrlChange} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setblogFormVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default AddBlog;
