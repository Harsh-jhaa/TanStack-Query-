import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const fetchPosts = async (pageNumber) => {
  const res = await api.get(`/posts?_start=${pageNumber + 3}&_limit=3`);
  try {
    if (res.status === 200) return res.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchIndividualPost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  try {
    // console.log(res.data);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res;
};
const updatePost = async (id) => {
  const res = await api.patch(`/posts/${id}`, { title: 'Updated title' });
  return res;
};
const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchPosts,
  api,
  fetchIndividualPost,
  deletePost,
  updatePost,
  fetchUsers,
};
