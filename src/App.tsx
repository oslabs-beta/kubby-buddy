// @ts-ignore
import React, { FC } from 'react';
// import './App';
import { UserProvider } from './UserContext';
import './App.scss';
import { SideNav } from './components/Sidenav/SideNav';
import { MainNav } from './components/Mainnav/MainNav';

// import logo from './assests/test.png'

// sidenav on the side, and centered vertically to mainnav
const App: FC = () => {
  return (
    <UserProvider>
      <div className="mainpage" data-testid="mainpage">
        <SideNav />
        <MainNav />
      </div>
    </UserProvider>
  );
};
export default App;
