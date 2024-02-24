import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  headers: { "Content-Type": "application/json" },
});

authApi.interceptors.request.use(
  (config) => {
    console.log(config);
    const acToken = localStorage.getItem("accessToken");

    if (config.url === "/user") {
      if (acToken) {
        config.headers["Authorization"] = `Bearer ${acToken}`;
      } else {
        alert("인증이 필요합니다.");
        return Promise.reject("인증이 필요합니다. 오류가 발생했어요.");
      }
    }
    return config;
  },
  () => {}
);
