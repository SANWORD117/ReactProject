import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SidebarConianer from "../../components/SidebarContainer";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const ProyectosCrear = () => {

    const navigate = useNavigate();

    const [proyecto, setProyecto] = useState({
        nombre:""
    })

    const {nombre} = proyecto;

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onChange= (e)=>{
    setProyecto({
        ...proyecto,
        [e.target.name]: e.target.value
    })
  }

  const crearProyecto = async ()=>{

    const data={
    nombre :proyecto.nombre
    }
    const response= await APIInvoke.invokePOST(`/proyectos`, data)

    const id = response.id;

    const verificarExistenciaUsuario = async (id) => {
        try {
          const response = await APIInvoke.invokeGET(
            `/proyectos?id=${id}`
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
      const usuarioExistente = await verificarExistenciaUsuario(id);
    if(!usuarioExistente){
        const msg = "El Proyecto No Fue Creado";
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
    }else{
        const msg = "El Proyecto Fue Creado Correctamente";
      swal({
        title: "Informacion",
        text: msg,
        icon: "success",
        buttons: {
          confirmar: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });

      setProyecto({
        nombre : ""
      })
      navigate("/proyectos-admin")
    }
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    crearProyecto();
    
  }

  

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarConianer></SidebarConianer>
      <div className="content-wrapper">
        <Content
          Titulo={"Creacion De Proyectos"}
          breadCrumb1={"Listado De Proyectos"}
          breadCrubm2={"Creacion"}
          ruta1={"/proyectos-admin"}
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
              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Ingrese el nombre del proyecto"
                      value={nombre}
                      onChange={onChange}
                      required/>
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProyectosCrear;
