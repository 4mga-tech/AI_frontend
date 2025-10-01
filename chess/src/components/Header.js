import React from "react";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl text-gray-500">
          Бие даалт
        </Link>

        <nav className="flex space-x-6 text-gray-500">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-200 ${isActive ? "text-white " : ""}`
            }
          >
            Нүүр хуудас
          </NavLink>
          <NavLink
            to="/offers"
            className={({ isActive }) =>
              `hover:text-gray-200 ${isActive ? "text-white " : ""}`
            }
          >
            Санал болгоё
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:text-gray-200 ${isActive ? "text-white " : ""}`
            }
          >
            Нэвтрэх
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
