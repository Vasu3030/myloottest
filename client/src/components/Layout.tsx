import LinkButton from "./LinkButton";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <div className="p-4">
      <LinkButton to="/" label="MyLOOT" />
    </div>
    <Outlet />
  </div>
);

export default Layout;