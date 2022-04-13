const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button type="submit">view</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} <button>like</button>
        <br />
        {blog.author}
        <br />
      </div>
    </div>
  )
}

export default Blog
