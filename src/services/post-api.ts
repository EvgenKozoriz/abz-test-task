import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface IPost {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

export const getApiData = async (limit = 10) => {
  const response = await axios.get(`${BASE_URL}/posts`, {
    params: {
      _limit: limit,
    },
  });
  return response.data;
};

export const postApiData = async (postData: IPost) => {
  const response = await axios.post(`${BASE_URL}/posts`, postData);
  return response.data;
};

export const deleteApiData = async (postId: number) => {
  const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
  return response.data;
};

export const putApiData = async (postId: number, data: IPost) => {
  const response = await axios.put(`${BASE_URL}/posts/${postId}`, data);
  return response.data;
};
