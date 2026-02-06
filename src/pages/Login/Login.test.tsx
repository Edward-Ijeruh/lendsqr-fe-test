import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login";
import * as authService from "../../services/auth.service";
import Login from "./Login";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("logs in successfully with correct credentials", async () => {
    const loginSpy = jest.spyOn(authService, "mockLogin");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "admin@lendsqr.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => expect(loginSpy).toHaveBeenCalledTimes(1));

    expect(loginSpy).toHaveBeenCalledWith({
      email: "admin@lendsqr.com",
      password: "password123",
    });

    expect(toast.success).toHaveBeenCalledWith("Login successful");
    expect(mockNavigate).toHaveBeenCalledWith("/users");
    expect(localStorage.getItem("lendsqr_auth")).toBe("true");
  });

  it("shows error with incorrect credentials", async () => {
    const loginSpy = jest.spyOn(authService, "mockLogin");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => expect(loginSpy).toHaveBeenCalledTimes(1));

    expect(toast.error).toHaveBeenCalledWith("Invalid email or password");
    expect(localStorage.getItem("lendsqr_auth")).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
