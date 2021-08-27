import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import Login from "../pages/Admin/Login/Login";
import { AuthContext } from "../context/AuthContext";
import { act } from "react-dom/test-utils";

const mockLogin = jest.fn();

const mockValue = {
  setIsLoading: jest.fn(),
  login: mockLogin,
};

describe("Login", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <AuthContext.Provider value={mockValue}>
        <Router history={history}>
          <Login />
        </Router>
      </AuthContext.Provider>
    );
  });

  // Required
  test("should display required error when values are invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockLogin).not.toBeCalled();
  });

  test("should display wrong pass error when values are invalid", async () => {
    fireEvent.input(screen.getByTestId("userId"), {
      target: {
        value: "kodlamıyoruz",
      },
    });
    fireEvent.input(screen.getByTestId("userPassword"), {
      target: {
        value: "bootcamp108",
      },
    });

    expect.assertions(1);
    try {
      await act(async () => {
        fireEvent.submit(screen.getByRole("button"));
      });
    } catch (e) {
      expect(e).toMatch("error");
    }
  });

  test("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByTestId("userId"), {
      target: {
        value: "kodluyoruz@admin.com",
      },
    });
    fireEvent.input(screen.getByTestId("userPassword"), {
      target: {
        value: "bootcamp109",
      },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(mockLogin).toBeCalledWith("kodluyoruz@admin.com", "bootcamp109");
    expect(history.location.pathname).toBe("/admin/basvuru-listesi");
  });
});
