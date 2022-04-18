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

  return (
    <div style={blogStyle}>
      <span className="title">{blog.title}</span>{" "}
      <span className="author">{blog.author}</span>
      <button onClick={toggleVisibility} style={showWhenVisible}>
        hide
      </button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>
        view
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
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
}

export default Blog
