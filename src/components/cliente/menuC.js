import React from "react";
import { Link,useParams } from "react-router-dom";
const Menu = () => {
  const {tipousuario} = useParams()
  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li className="nav-item">
          <Link to={"/proyectos"} className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              Pedidos
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
