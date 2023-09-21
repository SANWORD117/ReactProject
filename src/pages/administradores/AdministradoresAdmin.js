import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SidebarConianer from "../../components/SidebarContainer";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import APIInvoke from "../../utils/APIInvoke";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

const AdministradoresAdmin = () => {
  const [usuario, setUsuario] = useState([]);

  const { tipousuario } = useParams();

  let arreglo = tipousuario.split("@")

  const rol = arreglo[0]

  const cargarAdministradores = async () => {
    try {
      var response = await APIInvoke.invokeGET(`/usuario?tipousuario=${rol}`);
      console.log("Respuesta de la API:", response); // Verifica la respuesta de la API

      if (Array.isArray(response) && response.length > 0) {
        setUsuario(response);
      } else {
        console.error("La respuesta de la API no contiene administradores.");
      }
    } catch (error) {
      console.error("Error al cargar los administradores:", error);
    }
  };

  useEffect(() => {
    cargarAdministradores();
  }, []);

  const eliminarAdministradores = async (e, id) => {
    e.preventDefault();
    const verificarExistenciaUsuario = async (id) => {
      try {
        const response = await APIInvoke.invokeGET(`/usuario?id=${id}`);
        if (response && response.length > 0) {
          return true; // El usuario ya existe
        }
        return false; // El usuario no existe
      } catch (error) {
        console.error(error);
        return false; // Maneja el error si la solicitud falla
      }
    };

    const verificarTipodeUsuario = async (tipousuario) => {
      try {
        const response = await APIInvoke.invokeGET(`/usuario?tipousuario=${tipousuario}`);
        if (response && response.length > 0) {
          return true; // El administrador ya existe
        }
        return false; // El administrador no existe
      } catch (error) {
        console.error(error);
        return false; // Maneja el error si la solicitud falla
      }
    };

    const usuarioExistente = await verificarExistenciaUsuario(id);
    const tipoUsuario = await verificarTipodeUsuario(tipousuario);

    if (usuarioExistente) {
      const response = await APIInvoke.invokeDELETE(`/usuario/${id}`);
      console.log(response)
      const msg = "Administrador Eliminado Correctamente";
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
      cargarAdministradores();
    } else {
      const msg = "El Administrador No Pudo Ser Eliminado";
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
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarConianer></SidebarConianer>
      <div className="content-wrapper">
        <Content
          Titulo={"Listado De Administradores"}
          breadCrumb1={"Inicio"}
          breadCrubm2={"Lista de Administradores"}
          ruta1={"/home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link
                  to={"/crear-cuenta-ad"}
                  className="btn btn-block btn-primary btn-sm"
                >
                  Añadir Administrador
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
                    <th style={{ width: "50%" }}>Nombre</th>
                    <th style={{ width: "50%" }}>Correo</th>
                    <th style={{ width: "25%" }}>Opiones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuario.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.correo}</td>
                      <td>
                        &nbsp;&nbsp;
                        &nbsp;&nbsp;
                        <button
                          onClick={(e) => eliminarAdministradores(e, item.id)}
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

export default AdministradoresAdmin;
