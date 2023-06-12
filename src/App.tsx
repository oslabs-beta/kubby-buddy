import React, { FC } from 'react';
// import './App';
import { UserProvider } from './UserContext'
import './App.scss'
import { SideNav } from './components/Sidenav/SideNav'
import { MainNav} from './components/Mainnav/MainNav'
// import logo from './assests/test.png'

// sidenav on the side, and centered vertically to mainnav 
const App: FC = () => {
  return (
    <UserProvider>
      <div className='mainpage'>
        {/* <img src={logo} /> */}
        {/* <h1>howdy kubby buddies! YOOO</h1> */}
        < SideNav />
        < MainNav />
      </div>
    </UserProvider>
  )
};
export default App;
