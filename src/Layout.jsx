import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
