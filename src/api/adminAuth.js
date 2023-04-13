import axios from "axios";

const baseUrl = "https://nameless-brook-67603.herokuapp.com/api/admin";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 發送請求前都要做一個在 header 放 authToken 的動作
axiosInstance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const adminLogin = async ({ account, password }) => {
  try {
    // 發出登入請求
    const res = await axios.post(`${baseUrl}/login`, { account, password });

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Login Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const getAdminTweets = async () => {
  try {
    // 發出獲取推文資料的請求
    const res = await axiosInstance.get(`${baseUrl}/tweets`);

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Get Tweets Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const getAdminUsers = async () => {
  try {
    // 發出獲取使用者資料的請求
    const res = await axiosInstance.get(`${baseUrl}/users`);

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Get Users Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const deleteTweet = async (id) => {
  try {
    // 發出刪除推文的請求
    const res = await axiosInstance.delete(`${baseUrl}/tweets/${id}`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Delete Tweet Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};
