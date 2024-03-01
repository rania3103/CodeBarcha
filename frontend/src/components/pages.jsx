import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Pages = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex ">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Pages;
