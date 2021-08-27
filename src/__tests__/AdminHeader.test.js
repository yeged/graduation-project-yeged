import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import AuthProvider from "../context/AuthContext";
import AdminHeader from "../components/Header/AdminHeader";

jest.mock("../context/AuthContext", () => {
  const React = require("react");

  const FakeContext = React.createContext();

  const FakeProvider = ({ children, value = {} }) => {
    return (
      <FakeContext.Provider value={value}>{children}</FakeContext.Provider>
    );
  };

  return FakeProvider;
});

describe("Admin Form", () => {
  const history = createMemoryHistory();

  // Router Test
  test("should go to forms list page when admin logged in", () => {
    render(
      <AuthProvider>
        <Router history={history}>
          <AdminHeader />
        </Router>
      </AuthProvider>
    );
    const button = screen.getByText("Başvuru Listesi");
    fireEvent.click(button);
    expect(history.location.pathname).toBe("/admin/basvuru-listesi");
  });
});
