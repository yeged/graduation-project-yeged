import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApplicationForm } from "../pages/Tickets";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { FormContext } from "../context/FormContext";

const form = (firstName, lastName, tcNo, age, address, application) => {
  fireEvent.input(screen.getByTestId("firstName"), {
    target: {
      value: firstName,
    },
  });
  fireEvent.input(screen.getByTestId("lastName"), {
    target: {
      value: lastName,
    },
  });

  fireEvent.input(screen.getByTestId("tcNo"), {
    target: {
      value: tcNo,
    },
  });

  fireEvent.input(screen.getByTestId("age"), {
    target: {
      value: age,
    },
  });

  fireEvent.input(screen.getByTestId("address"), {
    target: {
      value: address,
    },
  });

  fireEvent.input(screen.getByTestId("application"), {
    target: {
      value: application,
    },
  });
};

const expectToBe = (firstName, lastName, tcNo, age, address, application) => {
  expect(screen.getByTestId("firstName").value).toBe(firstName);
  expect(screen.getByTestId("lastName").value).toBe(lastName);
  expect(screen.getByTestId("tcNo").value).toBe(tcNo);
  expect(screen.getByTestId("age").value).toBe(age);
  expect(screen.getByTestId("address").value).toBe(address);
  expect(screen.getByTestId("application").value).toBe(application);
};

const mockForm = jest.fn();

const mockValue = {
  sendTicket: mockForm,
};

describe("ApplicationForm", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <FormContext.Provider value={mockValue}>
        <Router history={history}>
          <ApplicationForm />
        </Router>
      </FormContext.Provider>
    );
  });

  // UI
  test("should have a submit button", () => {
    expect(screen.getByText("Gönder")).toBeInTheDocument();
  });

  test("should have form inputs", () => {
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("tcNo")).toBeInTheDocument();
    expect(screen.getByTestId("age")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
    expect(screen.getByTestId("application")).toBeInTheDocument();
  });
  // UI

  // Required
  test("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(6);
    expect(mockForm).not.toBeCalled();
  });
  // Required

  // Matching Error
  test("should display matching error when name and tcNo is invalid", async () => {
    form(
      "54",
      "*?",
      "BE34567A91R",
      "1990-12-31",
      "İstanbul / Beşiktaş",
      "For Testing This Form"
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(mockForm).not.toBeCalled();
    expectToBe(
      "54",
      "*?",
      "BE34567A91R",
      "1990-12-31",
      "İstanbul / Beşiktaş",
      "For Testing This Form"
    );
  });

  test("should display matches error when tcNo starts with 0", async () => {
    form(
      "Yiğit",
      "Ceylan",
      "02312312312",
      "1990-12-31",
      "İstanbul / Beşiktaş",
      "For Testing This Form"
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
    expectToBe(
      "Yiğit",
      "Ceylan",
      "02312312312",
      "1990-12-31",
      "İstanbul / Beşiktaş",
      "For Testing This Form"
    );
  });

  test("should display length error when  tcNo is invalid", async () => {
    form(
      "Yiğit",
      "Ceylan",
      "123",
      "1990-12-31",
      "İstanbul / Beşiktaş",
      "For Testing This Form"
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
    expectToBe(
      "Yiğit",
      "Ceylan",
      "123",
      "1990-12-31",
      "İstanbul / Beşiktaş",
      "For Testing This Form"
    );
  });
  // Matching Error

  //Min Length

  test("should display min length error when name, address, application  is invalid", async () => {
    form("Y", "C", "12345678911", "1990-12-31", "İst", "For");

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(4);
    expect(mockForm).not.toBeCalled();
    expectToBe("Y", "C", "12345678911", "1990-12-31", "İst", "For");
  });

  test("should display min length error when date of birth(age) is invalid", async () => {
    form(
      "Yiğit",
      "Ceylan",
      "12345678911",
      "1920-12-31",
      "İstanbul / Beşiktaş",
      "For Testing"
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
    expectToBe(
      "Yiğit",
      "Ceylan",
      "12345678911",
      "1920-12-31",
      "İstanbul / Beşiktaş",
      "For Testing"
    );
  });
  //Min Length

  //Max Length
  test("should display max length error when name, address, application  is invalid", async () => {
    form(
      "This name is soo long",
      "This lastname is soo long",
      "12345678911",
      "1990-12-31",
      "İstanbul for seven times. İstanbul for seven times. İstanbul for seven times. İstanbul for seven times. İstanbul for seven times. İstanbul for seven times.",
      "For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times."
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(4);
    expect(mockForm).not.toBeCalled();
    expectToBe(
      "This name is soo long",
      "This lastname is soo long",
      "12345678911",
      "1990-12-31",
      "İstanbul for seven times. İstanbul for seven times. İstanbul for seven times. İstanbul for seven times. İstanbul for seven times. İstanbul for seven times.",
      "For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times. For Testing This Form sixx times."
    );
  });

  test("should display max length error when date of birth(age) is invalid", async () => {
    form(
      "Yiğit",
      "Ceylan",
      "12345678911",
      "2022-12-31",
      "İstanbul / Beşiktaş",
      "For Testing"
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
    expectToBe(
      "Yiğit",
      "Ceylan",
      "12345678911",
      "2022-12-31",
      "İstanbul / Beşiktaş",
      "For Testing"
    );
  });
  //Max Length

  // Value Is Valid
  test("should not display error when value is valid", async () => {
    form(
      "Yiğit",
      "Ceylan",
      "12345678911",
      "2013-01-29",
      "İstanbul / Beşiktaş",
      "For Testing"
    );

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));

    expect(mockForm).toHaveBeenCalled();
    expect(screen.getByTestId("firstName").value).toBe("");
    expect(screen.getByTestId("lastName").value).toBe("");
    expect(screen.getByTestId("tcNo").value).toBe("");
    expect(screen.getByTestId("age").value).toBe("");
    expect(screen.getByTestId("address").value).toBe("");
    expect(screen.getByTestId("application").value).toBe("");

    expect(history.location.pathname).toBe("/basvuru-basarili");
  });
});
