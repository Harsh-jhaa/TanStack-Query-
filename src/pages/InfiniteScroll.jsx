import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchUsers } from '../API/api';
import { useInView } from 'react-intersection-observer';

const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage, allPages);
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 1;

  //     if (bottom && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   };

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll);

    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
    if (inView && hasNextPage) fetchNextPage();
  }, [hasNextPage, inView, fetchNextPage]);

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>Something went wrong, try again</h1>;

  return (
    <div>
      <h1>Infinite Scroll with react query or tanstack query v5</h1>

      {data?.pages.map((page, index) => (
        <ul>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: '10px', border: '1px solid #ccc' }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} style={{ padding: '20px', textAlign: 'center' }}>
        {isFetchingNextPage
          ? 'Loading More...'
          : hasNextPage
          ? 'Scroll down to load more'
          : 'Nothing more to load'}
      </div>
    </div>
  );
};

export default InfiniteScroll;
