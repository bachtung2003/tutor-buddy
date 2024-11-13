import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Cookies from "js-cookie";

describe("GlobalApi tests", () => {
  const mock = new MockAdapter(axios);
  const API_BASE_URL = "http://localhost:8080";

  beforeEach(() => {
    // Clear mocks before each test
    mock.reset();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  });

  it("");
});
