import axios from "axios";

const baseUrl = "https://nameless-brook-67603.herokuapp.com/api/tweets";

const axiosInstance = axios.create({
  baseUrl: baseUrl,
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

export const getTopUsers = async () => {
  try {
    // 發出Get Top Users 請求
    const res = await axiosInstance.get(`${baseUrl}/topUsers`);
    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get Top Users Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const getAllTweets = async () => {
  try {
    // 發送取得所有推文的請求
    const res = await axiosInstance.get(baseUrl);

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Get Tweets Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const postTweet = async ({ description }) => {
  try {
    // 發送新增推文的請求
    const res = await axiosInstance.post(baseUrl, { description });

    return res.data;
  } catch (error) {
    console.error("[ ⚠️⚠️⚠️ Post Tweet Failed ]:", error.response.data.message);

    return error.response.data;
  }
};

export const getSingleTweet = async (tweetId) => {
  try {
    // 發送取得單一推文資訊的請求
    const res = await axiosInstance.get(`${baseUrl}/${tweetId}`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get Single Tweet Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const getSingleTweetReplies = async (tweetId) => {
  try {
    // 發送取得單一推文所有回覆的請求
    const res = await axiosInstance.get(`${baseUrl}/${tweetId}/replies`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get Single Tweet Replies Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const postReply = async ({ tweetId, comment }) => {
  try {
    // 發送回覆推文的請求
    const res = await axiosInstance.post(`${baseUrl}/${tweetId}/replies`, {
      comment,
    });

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Get Post Reply Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const postTweetLike = async (tweetId) => {
  try {
    // 發送新增喜歡特定推文的請求
    const res = await axiosInstance.post(`${baseUrl}/${tweetId}/like`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Post Tweet Like Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};

export const postTweetUnLike = async (tweetId) => {
  try {
    // 發送取消喜歡特定推文的請求
    const res = await axiosInstance.post(`${baseUrl}/${tweetId}/unlike`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Post Tweet Unlike Failed ]:",
      error.response.data.message
    );

    return error.response.data;
  }
};
