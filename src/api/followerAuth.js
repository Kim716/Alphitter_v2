import axios from "axios";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const baseUrl = `${apiDomain}/followships`;

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

export const postFollowships = async ({ id }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}`, {
      id,
    });

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Post Followships Failed ]:",
      error.response.data.message
    );
    return error.response.data;
  }
};

export const deleteFollowships = async ({ id }) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/${id}`);

    return res.data;
  } catch (error) {
    console.error(
      "[ ⚠️⚠️⚠️ Delete Followships Failed ]:",
      error.response.data.message
    );
    return error.response.data;
  }
};
