import React from "react";
import Menu from "./menu";
import Logo from '../img/Carebulldog.jpg';
import { Link,useParams } from 'react-router-dom';

const SidebarConianer = () => {
  const {tipousuario} = useParams()
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="#" className="brand-link">
        <img
          src={Logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">OmegaPetShop</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
           &nbsp;
          </div>
          <div className="info">
           &nbsp;
          </div>
          <div className="info">
            <Link to={"/home/:tipousuario"} className="d-block">
              Inicio
            </Link>
          </div>
        </div>
        
        <Menu></Menu>
      </div>
    </aside>
  );
};

export default SidebarConianer;
