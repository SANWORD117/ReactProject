import React , { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuenta = () => {

    const navigate = useNavigate();

    const [usuario , setUsuario] = useState(
        {
            nombre:'',
            correo:'',
            contraseña:'',
            confirmar:'',
            tipousuario:'cliente'
        }
    );
    
    
    const { nombre, correo, contraseña, confirmar, tipousuario } = usuario;

    const onChange = (e) => {
        setUsuario(
            {
                ...usuario,
                [e.target.name]: e.target.value
            }
        )
    }

    useEffect(()=> {
        document.getElementById("nombre").focus();
    }, [])

    const verificarExistenciaUsuario = async (nombre) => {
        try {
          const response = await APIInvoke.invokeGET(
            `/usuario?nombre=${nombre}`
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

    const verificarExistenciaCorreo = async (correo) => {
        try {
          const response = await APIInvoke.invokeGET(
            `/usuario?correo=${correo}`
          );
          if (response && response.length > 0) {
            return true; // El correo ya esta siendo usado
          }
          return false; // El correo ya esta siendo usado
        } catch (error) {
          console.error(error);
          return false; // Maneja el error si la solicitud falla
        }
    };

    const crearCuenta = async () => {
    const usuarioExistente = await verificarExistenciaUsuario(nombre);
        if (contraseña !== confirmar) {
            const msg = "Las contraseñas son diferentes.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })
        } else if (contraseña.length<6) {
            const msg = "La contraseña debe ser al menos de 6 caracteres."
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })
        } else {
            const correoExistente = await verificarExistenciaCorreo(correo);
            console.log(correoExistente)
            if (correoExistente) {
                const msg = "El correo ya esta siendo usado, prueba con otro por favor."
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                })
            } else if (usuarioExistente) {
                
                console.log(usuarioExistente)
                const msg = "El usuario ya existe"
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                })
            } else {
                const data = {
                    nombre:usuario.nombre,
                    correo: usuario.correo,
                    contraseña: usuario.contraseña,
                    tipousuario: usuario.tipousuario
                }
                const response = await APIInvoke.invokePOST(`/usuario`, data);
                const mensaje = response.msg;
                console.log(mensaje)
                console.log(response)

                const msg = "El usuario fue creado exitosamente."
                swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                })

                setUsuario({
                    nombre:'',
                    correo:'',
                    contraseña:'',
                    confirmar:'',
                    tipousuario:'cliente'
                })
                console.log(tipousuario)
                navigate("/")
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }


    return(
        <div className="hold-transition login-page">
        <div className="login-box">
        <div className="login-logo">
            <b>Crear</b> Cuenta
        </div>

        <div className="card">
        <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido Ingrese Sus Credenciales</p>
            <form onSubmit={onSubmit}>

            <div className="input-group mb-3">
                <input type="text"
                    className="form-control"
                    placeholder="Nombre"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onChange}
                    required/>
                <div className="input-group-append">
                <div className="input-group-text">
                <span className="fas fa-user" />
            </div>
            </div>
        </div>    

            <div className="input-group mb-3">
                <input type="email"
                    className="form-control"
                    placeholder="Correo"
                    id="correo"
                    name="correo"
                    value={correo}
                    onChange={onChange}
                    required/>
                <div className="input-group-append">
                <div className="input-group-text">
                <span className="fas fa-envelope" />
            </div>
            </div>
            </div>

            <div className="input-group mb-3">
                <input type="password"
                    className="form-control" 
                    placeholder="contraseña" 
                    id="contraseña"
                    name="contraseña"
                    value={contraseña}
                    onChange={onChange}
                    required/>
                <div className="input-group-append">
                <div className="input-group-text">
                <span className="fas fa-unlock" />
            </div>
            </div>
            </div>

            <div className="input-group mb-3">
                <input type="password"
                    className="form-control" 
                    placeholder="Confirmar Contraseña" 
                    id="confirmar"
                    name="confirmar"
                    value={confirmar}
                    onChange={onChange}
                    required/>
                    <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock" />
                    </div>
                    </div>
            </div>

            <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                    Crear Cuenta
                </button>
                <Link to={"/"} className="btn btn-block btn-danger">
                    Regresar al Login
                </Link>
            </div>
        </form>
    </div>
    </div>
    </div>
</div>
    );
}

export default CrearCuenta;