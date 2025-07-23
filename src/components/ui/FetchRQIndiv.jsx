import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchIndividualPost } from '../../API/api';
import { useParams } from 'react-router-dom';

const FetchRQIndiv = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchIndividualPost(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong, try again</p>;

  return (
    <div>
      <div className='section-accordion'>
        <h1>Post Number : {post.id} </h1>
        <div>
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default FetchRQIndiv;
