import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlogForm";
import Notification from "./components/Notifications";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [classNotification, setClassNotification] = useState("");
  const [updateBlogs, setUpdageBlogs] = useState(false);

  const addBlogForm = useRef();
  const sortByLikes = (a, b) => b.likes - a.likes;

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(sortByLikes)));
  }, [updateBlogs]);

  useEffect(() => {
    const userLocal = window.localStorage.getItem("loggedBlogUser");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setErrorMessage(`Login Successful! Welcome ${user.name}`);
      setClassNotification("successful");
      setTimeout(() => {
        setErrorMessage("");
        setClassNotification("");
      }, 5000);
    } catch (exception) {
      const errorText = JSON.parse(exception.request.responseText);
      if (errorText && errorText.error) {
        setErrorMessage(errorText.error);
      }
      setClassNotification("error");
      setTimeout(() => {
        setErrorMessage("");
        setClassNotification("");
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogUser", JSON.stringify(user));
    setUser(null);
  };

  const handleBlogAddition = async (title, author, url) => {
    addBlogForm.current.toggleVisibility();
    try {
      await blogService.addBlog({
        title: title,
        author: author,
        url: url,
      });
      setUpdageBlogs(!updateBlogs);
      setErrorMessage(`a new blog ${title} by ${author} added`);
      setClassNotification("successful");
      setTimeout(() => {
        setErrorMessage("");
        setClassNotification("");
      }, 5000);
    } catch (exception) {
      const errorText = JSON.parse(exception.request.responseText);
      if (errorText && errorText.error) {
        setErrorMessage(errorText.error);
      } else {
        setErrorMessage(
          "An error occured when creating trying to create the new blog. Make sure the input fullfills the criteria of a blog post"
        );
      }
      setClassNotification("error");
      setTimeout(() => {
        setErrorMessage("");
        setClassNotification("");
      }, 5000);
    }
  };

  const handleAddLike = async (blog, blogId) => {
    try {
      await blogService.updateBlog(blog, blogId);
      setUpdageBlogs(!updateBlogs);
    } catch (exception) {
      setErrorMessage("Not able to update the blog post");
      setClassNotification("error");
      setTimeout(() => {
        setErrorMessage("");
        setClassNotification("");
      }, 5000);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Do you want to delete ${blog.title} permanently?`)) {
        await blogService.deleteBlog(blog.id);
        setErrorMessage(`${blog.title} by ${blog.author} successfully deleted`);
        setUpdageBlogs(!updateBlogs);
        setClassNotification("successful");
        setTimeout(() => {
          setErrorMessage("");
          setClassNotification("");
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage(
        "Not able to delete blog " + blog.title + " by " + blog.author
      );
      setClassNotification("error");
      setTimeout(() => {
        setErrorMessage("");
        setClassNotification("");
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} classVal={classNotification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="loginButton">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} classVal={classNotification} />
      <div style={{ display: "flex" }}>
        <p>{user.name} logged in</p>{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonText="new blog" ref={addBlogForm}>
        <AddBlog addBlog={handleBlogAddition} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={handleAddLike}
          deleteBlog={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
