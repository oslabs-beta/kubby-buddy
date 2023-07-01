import React, { FC } from 'react';
// import './App';
import { UserProvider } from './UserContext';
import './App.scss';
import { SideNav } from './components/Sidenav/SideNav';
import { MainNav } from './components/Mainnav/MainNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import logo from './assests/test.png'

// sidenav on the side, and centered vertically to mainnav

const queryClient = new QueryClient();
const App: FC = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <div className="mainpage">
          <SideNav />
          <MainNav />
        </div>
      </QueryClientProvider>
    </UserProvider>
  );
};
export default App;
