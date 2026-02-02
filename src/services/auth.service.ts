interface LoginPayload {
  email: string;
  password: string;
}

export const mockLogin = async ({ email, password }: LoginPayload) => {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      if (email === "admin@lendsqr.com" && password === "password123") {
        localStorage.setItem("lendsqr_auth", "true");
        resolve({ success: true });
      } else {
        resolve({
          success: false,
          message: "Invalid email or password",
        });
      }
    }, 500);
  });
};
