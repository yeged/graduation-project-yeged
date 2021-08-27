/* eslint-disable import/named */
/* eslint-disable import/namespace */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApplicationInfo } from "../pages/Tickets";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { FormContext } from "../context/FormContext";

const mockFetch = jest.fn();

const mockValue = {
  getForm: mockFetch,
  formData: [
    {
      firstName: "Yiğit",
      lastName: "Ceylan",
    },
  ],
};

//todo

describe("Application Info", () => {
  const history = createMemoryHistory();

  test("should go to 404 page when formdata  is empty", () => {
    history.push({
      pathname: "/basvuru/1n1ca",
    });
    render(
      <FormContext.Provider value={{ formData: [] }}>
        <Router history={history}>
          <ApplicationInfo />
        </Router>
      </FormContext.Provider>
    );

    expect(screen.getByTestId("image404")).toBeInTheDocument();
  });

  test("if form data is not empty display values and locate users page", async () => {
    history.push({
      pathname: "/basvuru/1n1cm",
      state: { applicationNo: "1N1CM" },
    });
    render(
      <FormContext.Provider value={mockValue}>
        <Router history={history}>
          <ApplicationInfo />
        </Router>
      </FormContext.Provider>
    );

    expect(screen.getByTestId("firstName").value).toBe("Yiğit");
    expect(screen.getByTestId("lastName").value).toBe("Ceylan");
    expect(history.location.pathname).toBe("/basvuru/1n1cm");
  });
});
