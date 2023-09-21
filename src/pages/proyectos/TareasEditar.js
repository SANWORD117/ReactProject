import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SidebarConianer from "../../components/SidebarContainer";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const TareasEditar = () => {
  const navigate = useNavigate();

  const { idproyecto } = useParams();
  let arreglo = idproyecto.split("@");
  const idTarea = arreglo[0];
  const nombreTarea = arreglo[1];
  const precioTarea = arreglo[2];
  const cantidadTarea = arreglo[3];
  const idP = arreglo[4];
  const nombreProyecto = arreglo[5];
  const tituloPagina = `Edicion De Tareas: ${nombreProyecto}`;

  const [tareas, setTareas] = useState({
    nombre: nombreTarea,
    precio: precioTarea,
    cantidad: cantidadTarea
  });

  const { nombre, precio, cantidad } = tareas;

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onChange = (e) => {
    setTareas({
      ...tareas,
      [e.target.name]: e.target.value,
    });
  };

  const editarTareas = async () => {
    let arreglo = idproyecto.split("@");
    const idTarea = arreglo[0];
    const nombreTarea = arreglo[1];
    const precioTarea = arreglo[2];
    const cantidadTarea = arreglo[3];
    const idP = arreglo[4];
    const nombreProyecto = arreglo[5];

    const data = {
      proyecto: idP,
      nombre: tareas.nombre,
      precio: tareas.precio,
      cantidad: tareas.cantidad
    };

    const response = await APIInvoke.invokePUT(`/tareas/${idTarea}`, data);
    const idTareaEditado = response.id;

    if (idTarea === idTareaEditado) {
      const msg = "La Tarea No Fue Editada Correctamente";
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
    } else {
      const msg = "La Tarea Fue Editada Correctamente";
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
      navigate(`/tareas-admin/${idP}@${nombreProyecto}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editarTareas();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarConianer></SidebarConianer>
      <div className="content-wrapper">
        <Content
          Titulo={tituloPagina}
          breadCrumb1={"Listado De Tareas"}
          breadCrubm2={"Edicion"}
          ruta1={`/tareas-admin/${idP}@${nombreProyecto}`}
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
                      required
                    />
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
};

export default TareasEditar;
