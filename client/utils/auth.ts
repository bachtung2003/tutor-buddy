// auth.ts
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const setAuthToken = (token: string) => {
  Cookies.set("accessToken", token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

export const setRefreshToken = (token: string) => {
  Cookies.set("refreshToken", token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

export const getSession = () => {
  const session = Cookies.get("accessToken");
  if (!session) return null;
  return jwtDecode(session);
};
