import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SidebarConianer from "../../components/SidebarContainer";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const ProyectosEditar = () => {

    const navigate = useNavigate();

    const{idproyecto}= useParams();
    let arreglo = idproyecto.split('@');
    const nombreProyecto= arreglo[1];

    const [proyecto, setProyecto] = useState({
        nombre:nombreProyecto
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

  const editarProyecto = async () =>{

    let arreglo = idproyecto.split('@');
    const idP= arreglo[0];

    const data= {
        nombre: proyecto.nombre
    }

    const response= await APIInvoke.invokePUT(`/proyectos/${idP}`,data)
    const idPEditado = response.id;

    if(idP === idPEditado){
        const msg = "El Proyecto No Fue Editado";
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
        const msg = "El Proyecto Fue Editado Correctamente";
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
      navigate("/proyectos-admin")
    }

  }

  const onSubmit = (e)=>{
    e.preventDefault();
    editarProyecto();
  }

    return ( 
        <div className="wrapper">
      <Navbar></Navbar>
      <SidebarConianer></SidebarConianer>
      <div className="content-wrapper">
        <Content
          Titulo={"Edicion De Proyectos"}
          breadCrumb1={"Listado De Proyectos"}
          breadCrubm2={"Edicion"}
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
                    Editar
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
}
 
export default ProyectosEditar;