import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
  const user = {
    token: "tst",
    username: "cveklica123",
    name: "Cveta Cveklic",
  }

  const blogs = [
    {
      url: "https://some.url",
      title: "Title 1",
      author: "Author 1",
      user: {
        username: "cveklica123",
        name: "Cveta Cveklic",
        id: "62532f6a55c3d9f1a394283f",
      },
      likes: 1,
      id: "62593cf60897a3e916e72cbc",
    },
    {
      url: "https://other.url",
      title: "Title 2",
      author: "Author 2",
      user: {
        username: "cveklica123",
        name: "Cveta Cveklic",
        id: "62532f6a55c3d9f1a394283f",
      },
      likes: 2,
      id: "62593d29b32ec11635b99e22",
    },
  ]

  const blog = blogs[0]

  const { container } = render(
    <Blog user={user} blog={blog} setBlogs={null} blogs={blogs} />
  )

  const title1 = screen.getByText("Title 1")
  expect(title1).toBeDefined()

  const authorSpan = container.querySelector(".author")
  expect(authorSpan).toHaveTextContent("Author 1")

  const url = screen.queryByText("https://some.url")
  expect(url).not.toBeVisible()

  const likesSpan = container.querySelector(".numberOfLikes")
  expect(likesSpan).not.toBeVisible()
})
