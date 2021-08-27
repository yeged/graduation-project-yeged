/* eslint-disable import/named */
/* eslint-disable import/namespace */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApplicationInquiry } from "../pages/Tickets";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import FormProvider from "../context/FormContext";

describe("ApplicationInquiry", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <FormProvider>
        <Router history={history}>
          <ApplicationInquiry />
        </Router>
      </FormProvider>
    );
  });

  // UI
  test("should have a submit button", () => {
    expect(screen.getByText("Sorgula")).toBeInTheDocument();
  });

  test("should have inquiry input", () => {
    expect(screen.getByTestId("applicationNo")).toBeInTheDocument();
  });
  // UI

  //Length
  test("should display length error when application number is invalid", async () => {
    fireEvent.input(screen.getByTestId("applicationNo"), {
      target: {
        value: "4LEN",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  //Match Error
  test("should display matching error when applicaiton number is invalid", async () => {
    fireEvent.input(screen.getByTestId("applicationNo"), {
      target: {
        value: "?2A2*",
      },
    });
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  test("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByTestId("applicationNo"), {
      target: {
        value: "1N1CM",
      },
    });
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(history.location.pathname).toBe("/basvuru/1N1CM");
  });
});
