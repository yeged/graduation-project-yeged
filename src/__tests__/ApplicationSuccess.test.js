/* eslint-disable import/named */
/* eslint-disable import/namespace */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApplicationSuccess } from "../pages/Tickets";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import FormProvider from "../context/FormContext";

describe("ApplicationInquiry", () => {
  const history = createMemoryHistory();

  test("should go to 404 page when applicaiton number is not valid", () => {
    history.push({
      pathname: "/basvuru-basarili",
    });
    render(
      <FormProvider>
        <Router history={history}>
          <ApplicationSuccess />
        </Router>
      </FormProvider>
    );
    expect(history.location.pathname).toBe("/404");
  });

  beforeEach(() => {
    history.push({
      pathname: "/basvuru-basarili",
      state: { applicationNo: "1N1CM" },
    });
    render(
      <FormProvider>
        <Router history={history}>
          <ApplicationSuccess />
        </Router>
      </FormProvider>
    );
  });
  test("should go to success form page when applicaiton number is valid", () => {
    expect(history.location.pathname).toBe("/basvuru-basarili");
  });

  test("should have success image", () => {
    expect(screen.getByTestId("imageSuccess")).toBeInTheDocument();
  });

  test("should have a thanks message", () => {
    expect(screen.getByText("Başvurunuz İçin Teşekkürler")).toBeInTheDocument();
  });
  test("should have a app no label", () => {
    expect(screen.getByText("Başvuru No")).toBeInTheDocument();
  });

  test("should have a application number", () => {
    expect(screen.getByText("1N1CM")).toBeInTheDocument();
  });
});
