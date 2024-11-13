// cookies.ts
import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
export const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
