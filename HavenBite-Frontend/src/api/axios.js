import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// URLs that should never trigger the refresh retry logic
const SKIP_REFRESH_URLS = ["/user/refresh-token", "/user/me", "/user/login", "/user/register" , "/user/update-profile",]

instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    // Check if this request should skip refresh logic
    const shouldSkip = SKIP_REFRESH_URLS.some(url => 
      originalRequest.url?.includes(url)
    )

    if (shouldSkip) {
      return Promise.reject(error) // just pass the error through cleanly
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await instance.post("/user/refresh-token")
        return instance(originalRequest)

      } catch (refreshError) {
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default instance;