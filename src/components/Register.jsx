import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import img from "../assets/LogoTecnoPinguin.jpg";
import "../css/Register.css";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SessionEndpoint from "../hook/SessionEndpoint";

export const Register = () => {
  const [loading, setLoanding] = useState(true);
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoanding(false);
    const result = await SessionEndpoint.Register(data.name, data.email, data.password);
    console.log(result);
    setLoanding(false);
    if (result.status === true) {
      setShow(true);
    } else {
      alert("Error al registrar");
    }
  };

  //PARA EL BOTON INICIAR SESION
  const Navigate = useNavigate();
  function Registro() {
    Navigate("/");
  }

  const verContraseña = watch("verContraseña");
  return (
    <>
      <div className="body template d-flex justify-content-center align-items-center 100-w vh-100">
        <img
          className="Icon"
          src={img}
          alt=""
          style={{ width: "170px", height: "170px" }}
        />
        <div className="SignUp">
          <div className="container_SignUp">
            <div className="SignUp_Container">
              <Button
                type="submit"
                className="Login btn btn-primary btn-lg"
                content="Iniciar Sesion"
                onClick={Registro}
              >Inicio de sesión</Button>
            </div>
          </div>
        </div>
        <div className="Registro p-5">
          <form className="form_Color" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="Titulo mb-3">Registro</h3>
            <div className="mb-3 ">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                {...register("lastName", {
                  required: true,
                })}
              />
            </div>

            {/*
              <div className="mb-3">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Telefono"
                  {...register("telephone", {
                    required: true,
                    maxLength: 10,
                  })}
                />
                {errors.Telefono?.type === "maxLength" && <p>Campo Obligatorio</p>}
              </div>
            */}
            
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                {...register("email", {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
              />
              {errors.Correo?.type === "pattern" && <p>Verifica El correo</p>}
            </div>
            <div className="mb-1">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...register("password", {
                  required: true,
                  maxLength: 8,
                })}
              />
              {errors.Contraseña?.type === "required" && <p>Campo Obligatorio</p>}
              {errors.Contraseña?.type === "maxLength" && (
                <p>Maximo 8 Caracteres </p>
              )}
            </div>
            <div>
              <label>ver contraseña_</label>
              <input type="checkbox" {...register("verContraseña")}></input>
            </div>
            {verContraseña && (
              <div>
                <label>Ver</label>
                <input type="text" disabled {...register("password")}></input>
              </div>
            )}
            <div className="btnLogin">
              {loading ? (
                <input className="register_button" type="submit" placeholder="Enviar" />
              ) : (
                <button className="btn btn-danger" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status"> Cargando...</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Modal
        size="sm"
        show={show}
        onHide={register}
        className="modal-con-fondo-azul"
      >
        <Modal.Header>
          <Modal.Title>
            Registro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Registro exitoso</Modal.Body>
        <Modal.Footer>
          <Button onClick={Registro}>
            Inicia sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
