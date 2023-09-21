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
          <Link to="/proyectos-admin" className="nav-link">
            <i className="nav-icon fas fa-paw" />
            <p>
              Categorias
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/administradores-admin/${tipousuario}`} className="nav-link">
            <i className="nav-icon fas fa-user" />
            <p>
              Administradores
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/proyectos-admin"} className="nav-link">
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
