import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useArticles } from "../hooks/useArticles";

global.fetch = vi.fn();

const mockArticle = {
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
};

describe("useArticles", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches articles and sets state", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        response: { docs: [mockArticle] },
      }),
    });

    const { result } = renderHook(() => useArticles("react"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(1);
    expect(result.current.articles[0].headline.main).toBe("Test Article");
    expect(result.current.error).toBeNull();
  });

  it("sets error on fetch failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useArticles("fail"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch...");
    expect(result.current.articles).toHaveLength(0);
  });

  it("clears articles and resets page when query changes", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        response: { docs: [mockArticle] },
      }),
    });

    const { result, rerender } = renderHook(({ query }) => useArticles(query), {
      initialProps: { query: "react" },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(1);

    rerender({ query: "redux" });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });
});
