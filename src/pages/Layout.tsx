import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "../CSS/Layout.css";

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <nav>
          <ul className="nav-style">
            {}
            {location.pathname === "/" ? (
              <li>
                <Link to="/AnimalPage">Djurens sida</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/">Hem</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Animal App</p>
      </footer>
    </div>
  );
};

export default Layout;
