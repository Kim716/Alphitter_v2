import axios from "axios";

const baseUrl = "https://nameless-brook-67603.herokuapp.com/api/users";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 發送請求前都要做一個在 header 放 authToken 的動作
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const login = async ({ account, password }) => {
  try {
    // 發出登入請求
    const res = await axios.post(`${baseUrl}/login`, { account, password });

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Login Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    // 發送註冊請求
    const res = await axios.post(baseUrl, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Register Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const getUserInfo = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/${userId}`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get User Info Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const putUserInfo = async ({
  loginUserId,
  name,
  introduction,
  avatar,
  cover,
}) => {
  const config = {
    headers: {
      // Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axiosInstance.put(
      `${baseUrl}/${loginUserId}`,
      {
        name,
        introduction,
        avatar,
        cover,
      },
      config
    );

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Put User Info Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const getUserTweets = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/${userId}/tweets`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get User Tweets Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const getUserReplies = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/${userId}/replied_tweets`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get User Replies Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const getUserLikedTweets = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/${userId}/likes`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get User Liked Tweets Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const putUserSettingInfo = async ({
  id,
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const res = await axiosInstance.put(`${baseUrl}/${id}/setting`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Put User Setting Info Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const getFollowers = async (userId) => {
  try {
    // 發送取得特定使用者的跟隨者們的請求
    const res = await axiosInstance.get(`${baseUrl}/${userId}/followers`);
    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get Followers Failed ]:",
      error.response.data.message
    );
    return error.response.data;
  }
};

export const getFollowings = async (userId) => {
  try {
    // 發送取得特定使用者正在跟隨的使用者們的請求
    const res = await axiosInstance.get(`${baseUrl}/${userId}/followings`);
    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get Followings Failed ]:",
      error.response.data.message
    );
    return error.response.data;
  }
};
