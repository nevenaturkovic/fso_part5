import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  if (visible) {
    return (
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <div> {blog.url}</div>
          <div>
            {" "}
            {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.username}</div>{" "}
        </div>
      </div>
    )
  } else {
    return (
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    )
  }
}

export default Blog
