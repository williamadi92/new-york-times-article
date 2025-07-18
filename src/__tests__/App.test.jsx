import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as useArticlesHook from "../hooks/useArticles";

vi.mock("../hooks/useArticles");

const mockUseArticles = useArticlesHook;

describe("App", () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    mockUseArticles.useArticles.mockReturnValue({
      articles: [
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
          abstract: "Test abstract content",
        },
      ],
      loading: false,
      error: null,
      loader: { current: null },
    });
  });

  it("renders SearchBar and ArticleList", () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText("Search articles...")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  it("updates input and triggers debounce (simulation)", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search articles...");

    fireEvent.change(input, { target: { value: "new query" } });

    await waitFor(() =>
      expect(mockUseArticles.useArticles).toHaveBeenCalledWith("new query")
    );
  });
});
