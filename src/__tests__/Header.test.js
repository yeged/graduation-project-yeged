import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import Header from "../components/Header/Header";

describe("Header", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={history}>
        <Header />
      </Router>
    );
  });

  // UI
  test("should have a Home Header", () => {
    expect(screen.getByText("Ticket App")).toBeInTheDocument();
  });
  // UI

  test("should go to form(home) page", async () => {
    const logoButton = screen.getByText("Ticket App");
    fireEvent.click(logoButton);
    expect(history.location.pathname).toBe("/");
  });
});
