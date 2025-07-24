import React, { Children } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/layout/MainLayout';
import FetchOld from './pages/FetchOld';
import FetchRQ from './pages/FetchRQ';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FetchRQIndiv from './components/ui/FetchRQIndiv';
import InfiniteScroll from './pages/InfiniteScroll';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='home' element={<Home />} />
          <Route path='trad' element={<FetchOld />} />
          <Route path='rq' element={<FetchRQ />} />
          <Route path='rq/:id' element={<FetchRQIndiv />} />
          <Route path='infinite' element={<InfiniteScroll />} />
        </Route>
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
