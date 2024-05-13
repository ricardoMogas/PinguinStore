import { useState } from "react";
import "../css/Login.css";
import img from "../assets/LogoTecnoPinguin.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hook/useForm";
import SessionEndpoint from "../hook/SessionEndpoint";

export const Login = () => {
  const { email, password, onInputChange, onResetForm } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    console.log(email, password);
    const result = await SessionEndpoint.Login(email, password)
    if (result.status === false) {
      alert('Correo o contraseña incorrecto');
    } else {
      console.log(result);
      localStorage.setItem("id", result.id);
      localStorage.setItem("rol", result.rol);
      if (result.rol === 2) {
        navigate("/adm", {
          state: { name: result.name, id: result.id, rol: result.rol, token: "token"},
        });
      } else {
        navigate("/home", {
          state: { name: result.name, id: result.id, rol: result.rol, token: "token"},
        });
      }
      setLoading(false);
    }
    setLoading(false);
  }

  function register() {
    navigate("/Registro");
  }

  return (
    <>
      <div className="fondo template d-flex justify-content-center align-items-center 100-w vh-100">
        <img
          className="Icono"
          src={img}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <div className="form_container p-5 ">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Bienvenido!</h2>
            <p>Ingresa Tus datos</p>
            <div className="mb-4 ">
              <input
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <p className="text-right">
              <a href="#">¿Olvidaste tu Contraseña?</a>
            </p>
            <div className="btnLogin">
              <button
                className="btn btn-danger btn-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span> Cargando...</span>
                  </>
                ) : (
                  "Ingresar"
                )}
              </button>
            </div>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
        <div className="fondoSignUp">
          <div className="container">
            <div className="SignUpContainer">
              <p className="Parrafo">¿Eres Nuevo? Registrate</p>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={register}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
