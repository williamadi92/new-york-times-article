import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArticleList from "../components/ArticleList";

const mockArticles = [
  {
    _id: "1",
    web_url: "https://nytimes.com/article1",
    headline: { main: "Test Article" },
    multimedia: {
      thumbnail: { url: "https://example.com/thumb.jpg" },
      caption: "Example caption",
    },
    byline: { original: "By John Doe" },
    pub_date: new Date().toISOString(),
    abstract: "This is a test abstract",
  },
];

describe("ArticleList", () => {
  it("renders list of articles", () => {
    render(<ArticleList articles={mockArticles} />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a test abstract")).toBeInTheDocument();
  });
});
