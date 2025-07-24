import React, { use } from 'react';
import { deletePost, fetchPosts, updatePost } from '../API/api';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = React.useState(0);
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts', pageNumber], // alternative to useState, as this changes on every render
    queryFn: () => fetchPosts(pageNumber), // alternative to useEffect as this changes on every render of queryKey
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(['posts', pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (resData, id) => {
      // console.log(resData, id);
      queryClient.setQueryData(['posts', pageNumber], (curElem) => {
        // curElem is the data in the cache , which is returned by the setQueryData after the update
        return curElem?.map((post) => {
          if (post.id === id) {
            return { ...post, title: 'Updated title' };
          }
          return post;
        });
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong, try again</p>;

  return (
    <div>
      <ul className='section-accordion'>
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className='pagination-section container'>
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={(prev) => setPageNumber((prev) => prev - 1)}
        >
          Prev
        </button>
        <h2>{pageNumber + 1}</h2>
        <button onClick={(prev) => setPageNumber((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FetchRQ;
