import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import FormProvider from "../context/FormContext";
import My404 from "../pages/My404/My404";

describe("My404 Page", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <FormProvider>
        <Router history={history}>
          <My404 />
        </Router>
      </FormProvider>
    );
  });

  test("should have 404 image", () => {
    expect(screen.getByTestId("image404")).toBeInTheDocument();
  });

  test("should have a Home Header", () => {
    expect(screen.getByText("Ticket App")).toBeInTheDocument();
  });

  test("should go to form(home) page", async () => {
    const logoButton = screen.getByText("Ticket App");
    fireEvent.click(logoButton);
    expect(history.location.pathname).toBe("/");
  });
});
