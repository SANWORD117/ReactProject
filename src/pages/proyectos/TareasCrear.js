import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SidebarConianer from "../../components/SidebarContainer";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import { Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils//APIInvoke";
import swal from "sweetalert";

const TareasCrear = () => {

    const navigate= useNavigate();

    const [tareas, setTareas] = useState({
        nombre: '',
        precio: '',
        cantidad: ''
    })

    const {nombre} = tareas;
    const {precio} = tareas;
    const {cantidad} = tareas;

    const{idproyecto}= useParams();
    let arreglo = idproyecto.split('@');
    const nombreProyecto= arreglo[1];
    const tituloPagina = `Creacion De Tareas: ${nombreProyecto}`

    useEffect(() => {
        document.getElementById("nombre").focus();
      }, []);

      const onChange= (e)=>{
        setTareas({
            ...tareas,
            [e.target.name]: e.target.value
        })
      }

      const crearTareas=async ()=>{
        let arreglo = idproyecto.split('@');
        const idP= arreglo[0];

    const data= {
        proyecto: idP,
        nombre: tareas.nombre,
        precio: tareas.precio,
        cantidad: tareas.cantidad
    }

    const response= await APIInvoke.invokePOST(`/tareas`,data)
    const idTarea = response.id;

    if(idTarea === ''){
        const msg = "La Tarea No Fue Creada Correctamente";
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
        const msg = "La Tarea Fue Creada Correctamente";
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
      navigate(`/tareas-admin/${idproyecto}`)
    }
      }

      const onSubmit = (e)=>{
        e.preventDefault();
        crearTareas();
      }


    return ( <div className="wrapper">
    <Navbar></Navbar>
    <SidebarConianer></SidebarConianer>
    <div className="content-wrapper">
      <Content
        Titulo={tituloPagina}
        breadCrumb1={"Listado De Tareas"}
        breadCrubm2={"Creacion"}
        ruta1={`/tareas-admin/${idproyecto}@${nombreProyecto}`}
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
                      placeholder="Ingrese el nombre de la producto"
                      value={nombre}
                      onChange={onChange}
                      required/>
                    <label htmlFor="precio">Precio:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="precio"
                      name="precio"
                      placeholder="Ingrese el precio del producto"
                      value={precio}
                      onChange={onChange}
                      required/>
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cantidad"
                      name="cantidad"
                      placeholder="Ingrese la cantidad del producto"
                      value={cantidad}
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
  </div> );
}
 
export default TareasCrear;