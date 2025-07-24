import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div>
        <NavLink className='tanstacklink' to='https://tanstack.com/'>
          TanStack Query{' '}
        </NavLink>
        <ul>
          <li>
            <NavLink to={'/home'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/trad'}>FetchOld</NavLink>
          </li>
          <li>
            <NavLink to={'/rq'}>FetchRQ</NavLink>
          </li>
          <li>
            <NavLink to={'/infinite'}>InfiniteScroll</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
