import React, { useState, useEffect } from "react";
import NavbarC from "../../components/cliente/Navbar";
import SidebarConianerC from "../../components/cliente/SidebarContainerC";
import ContentC from "../../components/cliente/Content";
import FooterC from "../../components/cliente/Footer";
import APIInvoke from "../../utils/APIInvoke";
import { Link } from "react-router-dom";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  const cargarProyectos = async () => {
    try {
      var response = await APIInvoke.invokeGET("/proyectos");
      console.log("Respuesta de la API:", response); // Verifica la respuesta de la API

      if (Array.isArray(response) && response.length > 0) {
        setProyectos(response);
      } else {
        console.error("La respuesta de la API no contiene proyectos.");
      }
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  return (
    <div className="wrapper">
      <NavbarC></NavbarC>
      <SidebarConianerC></SidebarConianerC>
      <div className="content-wrapper">
        <ContentC
          Titulo={"Listado De Productos"}
          breadCrumb1={"Inicio"}
          breadCrubm2={"Lista de Productos"}
          ruta1={"/homeC/:tipousuario"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>

                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>ID</th>
                    <th style={{ width: "50%" }}>Nombre</th>
                    <th style={{ width: "25%" }}>Opiones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>
                      <Link
                          to={`/tareas/${item.id}@${item.nombre}`}
                          className="btn btn-sm btn-info"
                        >
                          Ver Mas
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <FooterC></FooterC>
    </div>
  );
};

export default Proyectos;
