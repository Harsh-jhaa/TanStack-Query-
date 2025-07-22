import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const fetchPosts = async () => {
  const res = await api.get('/posts');
  try {
    if (res.status === 200) return res.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchPosts, api };
