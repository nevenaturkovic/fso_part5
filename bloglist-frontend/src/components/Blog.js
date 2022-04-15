import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, user, setBlogs, blogs }) => {
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

  const renderDeleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <button
          onClick={async () => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
              await blogService.remove(blog.id)
              setBlogs(blogs.filter((b) => blog.id !== b.id))
            }
          }}
        >
          remove
        </button>
      )
    }
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
            {blog.likes}{" "}
            <button
              onClick={async () => {
                const updatedBlog = await blogService.update(blog.id, {
                  likes: blog.likes + 1,
                })
                setBlogs(blogs.map((b) => (blog.id === b.id ? updatedBlog : b)))
              }}
            >
              like
            </button>
          </div>
          <div>{blog.user.username}</div> {renderDeleteButton()}
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
