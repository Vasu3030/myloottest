import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <div className="p-4">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `top-4 left-4 px-3 py-2 rounded-lg font-bold shadow-md w-full ${isActive ?
            "bg-amber-400 text-gray-900"
            : "bg-gray-700 text-white"
          }`
        }
      >
        MyLOOT
      </NavLink>

    </div>
    <Outlet />
  </div>
);

export default Layout;