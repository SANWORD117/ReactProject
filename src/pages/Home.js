import React from "react";
import Navbar from "../components/Navbar";
import SidebarConianer from "../components/SidebarContainer";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const {tipousuario} = useParams()
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarConianer></SidebarConianer>
      <div className="content-wrapper">
        <Content
        Titulo={"Categorias"}
        breadCrumb1={"Inicio"}
        breadCrubm2={"Categorias"}
        ruta1={"/home/:tipousuario"}
        />
        
        <section className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Categorias</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-paw" />
                  </div>
                  <Link to="/proyectos-admin" className="small-box-footer">
                    Ver Categorias <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>Administradores</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-user" />
                  </div>
                  <Link to={`/administradores-admin/${tipousuario}`} className="small-box-footer">
                    Ver Administradores <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>Pedidos</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-book" />
                  </div>
                  <Link to="/proyectos-admin" className="small-box-footer">
                    Ver Pedidos <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Home;
