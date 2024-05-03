import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { Spinner } from "react-bootstrap";

import { NavbarAdm } from "./NavbarAdm";

export const Ingredientes = () => {
  useEffect(() => {
    // Realiza la solicitud GET cuando el componente se monta
    const url = import.meta.env.VITE_REACT_APP_BASE_API;
    fetch(`${url}/Ingredients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no se pudo completar correctamente.");
        }
        return response.json();
      })
      .then((responseData) => {
        setIngredientes(responseData.data);
        console.log(responseData.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud GET:", error);
        setLoading(false);
      });
  }, []);

  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_BASE_API;
  const [ingredients, setIngredientes] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [pathImage, setpathImage] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  const openModal = (op, id, name, price, isAvailable, stock, pathImage) => {
    setId("");
    setName("");
    setStock("");
    setPrice("");
    setIsAvailable("");

    /* setpathImage(""); */
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar Ingrediente");
    } else if (op === 2) {
      setTitle("Modificar Ingrediente");
      setId(id);
      setName(name);
      setStock(stock);
      setPrice(price);
      setIsAvailable(isAvailable);

      /* etpathImage(pathImage); */
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };
  const validar = () => {
    var parametros;
    var metodo;
    if (name.trim() === "") {
      show_alerta("INGRESA EL NOMBRE DEL INGREDIENTE", "warning");
    } else if (price.trim() === "") {
      show_alerta("INGRESA EL PRECIO DEL INGREDIENTE", "warning");
    } else if (isAvailable.trim() === "") {
      show_alerta("INGRESA EL MODO DEL INGREDIENTE", "warning");
    } else {
      if (operation === 1) {
        parametros = {
          name: name.trim(),
          stock: stock.trim(),
          price: price.trim(),
          /*  pathImage: pathImage.trim(), */
          isAvailable: isAvailable.trim(),
        };
        metodo = "POST";
      } else {
        parametros = {
          id: id,
          name: name.trim(),
          stock: stock.trim(),
          price: price.trim(),
          /*  pathImage: pathImage.trim(), */
          isAvailable: isAvailable.trim(),
        };
        metodo = "PUT";
      }
      enviarSolicitud(metodo, parametros);
    }
  };
  const enviarSolicitud = async (metodo, parametros) => {
    await axios({ method: metodo, url: url, data: parametros })
      .then(function (respuesta) {
        var tipo = respuesta.data(0);
        var msj = respuesta.data(1);
        show_alerta(msj, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
          getProducts();
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "error");
        console.log(error);
      });
  };
  const deleteProduct = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro de eliminar el producto " + name + " ?",
      icon: "question",
      text: "No se podra dar marcha tras",
      showCancelButton: true,
      confirmButtonText: "si,eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        enviarSolicitud("DELETE", { id: id });
      } else {
        show_alerta("El producto No fue eliminado", "info");
      }
    });
  };
  return (
    <>
      <NavbarAdm name={"nombre"} />
      {loading ? (
        <div className="center-spinner">
          <Spinner
            className="custom-spinner"
            animation="border"
            variant="black"
          />
        </div>
      ) : (
        <div className="yellow template justify-content-center align-items-center 100-w vh-100 ">
          <div className="container-fluid mb-1">
            <div className="container  template justify-content-center align-items-center 100-w vh-100 p-4">
              <div className="d-flex flex-row-reverse">
                <a href="../Adm">
                  <button className="btn btn-danger">
                    <i className="fa fa-edit" /> Regresar
                  </button>
                </a>
              </div>
              <button
                onClick={() => openModal(1)}
                type="button"
                className="btn btn-primary mb-5"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa fa-plus"></i> Añadir
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <label className="h5">{title}</label>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {/*  <input type="hidden " id="id"></input> */}
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa-gift"></i>
                        </span>
                        <input
                          type="number"
                          id="id"
                          className="form-control"
                          placeholder="Id"
                          value={id}
                          onChange={(e) => setId(e.target.value)}
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa-gift"></i>
                        </span>
                        <input
                          type="text"
                          id="nombre"
                          className="form-control"
                          placeholder="Nombre"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa"></i>
                        </span>
                        <input
                          type="text"
                          id="stock"
                          className="form-control"
                          placeholder="Cantidad"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        ></input>
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa"> $</i>
                        </span>
                        <input
                          type="number"
                          id="price"
                          className="form-control"
                          placeholder="Precio"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></input>
                      </div>
                      {/*  <div className="input-group mb-3"> 
                         <span className="input-group-text"> 
                           <i className="fa fa"></i> 
                        </span> 
                     <input 
                          type="text" 
                          id="pathImage" 
                         className="form-control" 
                          placeholder="url" 
                          value={pathImage} 
                         onChange={(e) => setDescription(e.target.value)} 
                        ></input> 
                       </div> */}
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa"></i>
                        </span>
                        <input
                          type="text"
                          id="isAvailable"
                          className="form-control"
                          placeholder="Habilitado"
                          value={isAvailable}
                          onChange={(e) => setIsAvailable(e.target.value)}
                        ></input>
                      </div>
                      <div className="d-grid col-6 mx-auto">
                        <button
                          className="btn btn-success"
                          onClick={() => validar()}
                        >
                          <i className="fa fa-floppy-disk"> Guardar</i>
                        </button>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        id="btnCerrar"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    {/*  <th>Imagen</th> */}
                    <th>Interruptor</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {ingredients.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>
                        ${new Intl.NumberFormat("es-mx").format(product.price)}
                      </td>
                      {/* <td>{product.pathImage}</td> */}
                      <td>{product.isAvailable}</td>

                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              product.id,
                              product.name,
                              product.stock,
                              product.price,
                              product.isAvailable
                              /*  product.pathImage, */
                            )
                          }
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() =>
                            deleteProduct(product.id, product.name)
                          }
                          className="btn btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                        &nbsp;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
