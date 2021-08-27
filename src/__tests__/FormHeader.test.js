import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import FormHeader from "../components/Header/FormHeader";

describe("Form Header", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={history}>
        <FormHeader />
      </Router>
    );
  });

  // Router Test
  test("should go to inquiry page", () => {
    const inquiryButton = screen.getByText("Başvuru Sorgula");
    fireEvent.click(inquiryButton);
    expect(history.location.pathname).toBe("/basvuru-sorgula");
  });

  test("should go to application form page", () => {
    const formButton = screen.getByText("Başvuru Formu");
    fireEvent.click(formButton);
    expect(history.location.pathname).toBe("/basvuru-olustur");
  });
});
