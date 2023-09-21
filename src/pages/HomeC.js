import React from "react";
import NavbarC from "../components/cliente/Navbar";
import SidebarConianerC from "../components/cliente/SidebarContainerC";
import ContentC from "../components/cliente/Content";
import FooterC from "../components/cliente/Footer";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const {tipousuario} = useParams()
  return (
    <div className="wrapper">
      <NavbarC></NavbarC>
      <SidebarConianerC></SidebarConianerC>
      <div className="content-wrapper">
        <ContentC
        Titulo={"Categorias"}
        breadCrumb1={"Inicio"}
        breadCrubm2={"Categorias"}
        ruta1={"/homeC/:tipousuario"}
        />
        
        <section className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>Pedidos</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-paw" />
                  </div>
                  <Link to={"/proyectos"} className="small-box-footer">
                    Hacer Pedidos <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterC></FooterC>
    </div>
  );
};
export default Home;
