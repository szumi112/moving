import { describe, expect, it } from "vitest";
import App from "./App";

import { render, screen, fireEvent } from "../test-utils";

describe("Simple working test", () => {
  it("button is visible", () => {
    render(<App />);

    const button = screen.getByText(/Pokaż więcej/i);
    expect(button).toBeInTheDocument();
  });
  it("button clicked", () => {
    render(<App />);

    const button = screen.getByTestId("reviews-button");
    fireEvent.click(button);
    expect(button).toHaveTextContent(/Pokaż mniej/i);
  });

  it("renders reviews", async () => {
    const reviews = [
      {
        _id: 1,
        name: "John Doe",
        date: "2022-05-01",
        img: "img1.jpg",
        review: "Lorem ipsum dolor sit amet.",
      },
      {
        _id: 2,
        name: "Jane Doe",
        date: "2022-04-30",
        img: "img2.jpg",
        review: "Consectetur adipiscing elit.",
      },
      {
        _id: 3,
        name: "Mary Smith",
        date: "2022-05-02",
        img: "img3.jpg",
        review:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        _id: 4,
        name: "Bob Johnson",
        date: "2022-05-03",
        img: "img4.jpg",
        review:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        _id: 5,
        name: "Alice Brown",
        date: "2022-05-04",
        img: "img5.jpg",
        review:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        _id: 6,
        name: "Tom Wilson",
        date: "2022-05-05",
        img: "img6.jpg",
        review:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      json: () => reviews,
    });

    render(<App />);

    const reviewsList = screen.getByRole("list");
    const button = screen.getByTestId("reviews-button");
    fireEvent.click(button);

    // important because it awaits for the mocked data to be displayed, and only then proceeds
    await screen.findByTestId("reviews-container");
    expect(reviewsList.children.length).toBeGreaterThan(2);

    delete global.fetch;
  });

  it("renders reviews and then hides them properly", async () => {
    const reviews = [
      {
        _id: 1,
        name: "John Doe",
        date: "2022-05-01",
        img: "img1.jpg",
        review: "Lorem ipsum dolor sit amet.",
      },
      {
        _id: 2,
        name: "Jane Doe",
        date: "2022-04-30",
        img: "img2.jpg",
        review: "Consectetur adipiscing elit.",
      },
      {
        _id: 3,
        name: "Mary Smith",
        date: "2022-05-02",
        img: "img3.jpg",
        review:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        _id: 4,
        name: "Bob Johnson",
        date: "2022-05-03",
        img: "img4.jpg",
        review:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        _id: 5,
        name: "Alice Brown",
        date: "2022-05-04",
        img: "img5.jpg",
        review:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        _id: 6,
        name: "Tom Wilson",
        date: "2022-05-05",
        img: "img6.jpg",
        review:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      json: () => reviews,
    });

    render(<App />);

    const reviewsList = screen.getByRole("list");
    const button = screen.getByTestId("reviews-button");
    fireEvent.click(button);

    // important because it awaits for the mocked data to be displayed, and only then proceeds
    await screen.findByTestId("reviews-container");
    expect(reviewsList.children.length).toBeGreaterThan(2);

    fireEvent.click(button);
    expect(reviewsList.children).toHaveLength(2);
    expect(button).toHaveTextContent(/pokaż więcej/i);
    screen.debug();
    delete global.fetch;
  });
});
