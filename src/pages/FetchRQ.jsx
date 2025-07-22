import React from 'react';
import { fetchPosts } from '../API/api';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'], // alternative to useState, as this changes on every render
    queryFn: fetchPosts, // alternative to useEffect as this changes on every render of queryKey
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchRQ;
