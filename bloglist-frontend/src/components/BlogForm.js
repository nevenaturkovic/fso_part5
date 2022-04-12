import { useState } from "react"

import blogService from "../services/blogs"

const BlogForm = ( {blogs, setBlogs, setNotifications} ) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotifications({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        kind: "newBlog",
      })
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
    } catch (error) {
        console.log(error)
      setNotifications({
        message: "invalid blog post",
        kind: "error",
      })
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
