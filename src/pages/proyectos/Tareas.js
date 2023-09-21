import React, { useState, useEffect } from "react";
import NavbarC from "../../components/cliente/Navbar";
import SidebarConianerC from "../../components/cliente/SidebarContainerC";
import ContentC from "../../components/cliente/Content";
import FooterC from "../../components/cliente/Footer";
import APIInvoke from "../../utils//APIInvoke";
import { Link, useParams } from "react-router-dom";

const Tareas = () => {

    const [tareas, setTareas] = useState([]);

    const{idproyecto}= useParams();
    let arreglo = idproyecto.split('@');
    const idP= arreglo[0]
    const nombreProyecto= arreglo[1];
    const tituloPagina = `Listado De Tareas: ${nombreProyecto}`

    const cargarTareas = async () => {
        try {
          var response = await APIInvoke.invokeGET(`/tareas?proyecto=${idP}`);
          console.log("Respuesta de la API:", response); // Verifica la respuesta de la API
    
          if (Array.isArray(response) && response.length > 0) {
            setTareas(response);
          } else {
            console.error("La respuesta de la API no contiene tareas.");
          }
        } catch (error) {
          console.error("Error al cargar las tareas:", error);
        }
      };

      useEffect(() => {
        cargarTareas();
      }, []);

  return (
    <div className="wrapper">
      <NavbarC></NavbarC>
      <SidebarConianerC></SidebarConianerC>
      <div className="content-wrapper">
        <ContentC
          Titulo={tituloPagina}
          breadCrumb1={"Listado De Productos"}
          breadCrubm2={"Tareas"}
          ruta1={"/proyectos"}
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
                    <th style={{ width: "30%" }}>Nombre</th>
                    <th style={{ width: "30%" }}>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {tareas.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.precio}</td>
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

export default Tareas;