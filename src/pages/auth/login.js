import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';


const Login = () => {

    //para redireccionar de un componente a otro
    const navigate = useNavigate();

    //definimos el estado inicial de las variables
    const [usuario, setUsuario] = useState({
      correo: '',
      contraseña: ''
    })

    const {correo, contraseña} = usuario;

    const onChange = (e) => {
      setUsuario({
          ...usuario,
          [e.target.name]: e.target.value
      })
    }

    useEffect(()=> {
      document.getElementById("correo").focus();
  }, [])

    const iniciarSesion = async () => {

      const verificarExistenciaCorreos = async (correo,contraseña) => {

          const response = await APIInvoke.invokeGET(
            `/usuario?correo=${correo}&contraseña=${contraseña}`
          );
          if (response && response.length > 0) {
            return response; // El usuario ya existe
          } else {
          return null; // El usuario no existe
        }
    };
    const correosExistentes = await verificarExistenciaCorreos(correo,contraseña);
      if (contraseña.length<6) {
        const msg = "Las contraseñas debe ser al menos de 6 caracteres.";
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
          
        if (!correosExistentes) {
          const msg = "No fue posible iniciar sesion, verifique los datos ingresados.";
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
            const msg = "Bienvenido.";
            swal({
                title: 'Inicio exitoso',
                text: msg,
                icon: 'success',
                buttons: {
                    confirmar: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            })
            console.log(verificarExistenciaCorreos)
            console.log(correosExistentes)
            const rol = correosExistentes[0].tipousuario
            console.log(rol)
            if (rol === 'admin'){
              //redireccionamos al home la pagina principal
            console.log("Redireccionando a /home")
            navigate(`/home/${rol}`)
            } else if (rol === 'cliente'){
              //redireccionamos al home la pagina principal
            console.log("Redireccionando a /home")
            navigate(`/homeC/${rol}`)  
            }
        }
      }
    }

    const onSubmit = (e) => {
      e.preventDefault()
      iniciarSesion()
    }

    return ( 
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <b>Iniciar</b> Sesión
          </div>
            
              <div className="card">
                <div className="card-body login-card-body">
                <p className="login-box-msg">Bienvenid@, ingrese sus credenciales</p>
              <form onSubmit={onSubmit}>    
                  <div className="input-group mb-3">
                    <input type="email" 
                      className="form-control" 
                      placeholder="Correo"
                      id="correo"
                      name="correo"
                      value={correo}
                      onChange={onChange}
                      required
                      />

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Contraseña"
                      id="contraseña"
                      name="contraseña"
                      value={contraseña}
                      onChange={onChange}
                      required 
                      />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="social-auth-links text-center mb-3">
                    <button type="submit" className="btn btn-block btn-primary">
                        Ingresar
                    </button>

                    <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
                        Crear Cuenta
                    </Link>
                  </div>
              </form>
            </div>
          </div>                
        </div>
      </div>
 );
}

export default Login;