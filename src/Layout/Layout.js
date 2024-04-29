import { Outlet } from "react-router-dom";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';

const Layout = () => {
  return (
    <>
        <Header />
        <div className="app_body">
            <Sidebar />
            <Outlet />
            <Widgets />
        </div>
    </>
  )
};


export default Layout;