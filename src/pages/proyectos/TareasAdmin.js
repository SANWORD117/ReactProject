import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SidebarConianer from "../../components/SidebarContainer";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import APIInvoke from "../../utils//APIInvoke";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

const TareasAdmin = () => {

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

      const eliminarTarea = async(e, idTarea, idP)=>{
        e.preventDefault();
        const verificarExistenciaUsuario = async (idTarea) => {
            try {
              const response = await APIInvoke.invokeGET(
                `/tareas?idTarea=${idTarea}`
              );
              if (response && response.length > 0) {
                return true; // El usuario ya existe
              }
              return false; // El usuario no existe
            } catch (error) {
              console.error(error);
              return false; // Maneja el error si la solicitud falla
            }
          };
    
          const usuarioExistente = await verificarExistenciaUsuario(idTarea);
    
        if(usuarioExistente){
            const response = await APIInvoke.invokeDELETE(`/tareas/${idTarea}?proyecto=${idP}`)
            const msg = "Tarea Eliminado Correctamente";
            swal({
              title: "Informacion",
              text: msg,
              icon: "success",
              buttons: {
                confirmar: {
                  text: "Ok",
                  value: true,
                  visible: true,
                  className: "btn btn-prymari",
                  closeModal: true,
                },
              },
            });
            cargarTareas();
        }else{
            const msg = "La Tarea No Pudo Ser Eliminada";
            swal({
              title: "Error",
              text: msg,
              icon: "error",
              buttons: {
                confirmar: {
                  text: "Ok",
                  value: true,
                  visible: true,
                  className: "btn btn-danger",
                  closeModal: true,
                },
              },
            });
        }

      }
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarConianer></SidebarConianer>
      <div className="content-wrapper">
        <Content
          Titulo={tituloPagina}
          breadCrumb1={"Listado De Productos"}
          breadCrubm2={"Tareas"}
          ruta1={"/proyectos-admin"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link
                  to={`/tareas-crear/${idP}@${nombreProyecto}`}
                  className="btn btn-block btn-primary btn-sm"
                >
                  Crear Tarea
                </Link>
              </h3>
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
                    <th style={{ width: "20%" }}>Cantidad</th>
                    <th style={{ width: "25%" }}>Opiones</th>
                  </tr>
                </thead>
                <tbody>
                  {tareas.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.precio}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        <Link
                          to={`/tareas-editar/${item.id}@${item.nombre}@${item.precio}@${item.cantidad}@${item.proyecto}@${nombreProyecto}`}
                          className="btn btn-sm btn-primary"
                        >
                          Editar
                        </Link>
                        &nbsp;&nbsp;
                        <button
                          onClick={(e) => eliminarTarea(e, item.id, item.proyecto)}
                          className="btn btn-sm btn-danger"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default TareasAdmin;
