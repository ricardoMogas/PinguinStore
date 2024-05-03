import "../css/Administrador.css";
import { NavbarAdm } from "../components/NavbarAdm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { Spinner } from "react-bootstrap";

export const Administrador = () => {
  const [loading, setLoading] = useState(true);
    // Realiza la solicitud GET cuando el componente se monta
    const url = import.meta.env.VITE_REACT_APP_BASE_API;
    fetch(`${url}/Products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no se pudo completar correctamente.");
        }
        return response.json();
      })
      .then((responseData) => {
        setProducts(responseData.data.products); 
       
        setLoading(false);
      })
      .catch((error) => {
       /*  console.error("Error al realizar la solicitud GET:", error); */
        setLoading(false);
      });
 
  
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  const openModal = (
    op,
    id,
    name,
    description,
    price,
    isAvailable,
    stock,
    img
  ) => {
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    setIsAvailable("");
    setStock("");
    setImg("");
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar Producto");
    } else if (op === 2) {
      setTitle("Modificar Producto");
      setId(id);
      setName(name);
      setDescription(description);
      setPrice(price);
      setIsAvailable(isAvailable);
      setStock(stock);
      setImg(img);
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };
  const validar = () => {
    var parametros;
    var metodo;
    if (name.trim() === "") {
      show_alerta("INGRESA EL NOMBRE DEL PRODUCTO", "warning");
    } else if (description.trim() === "") {
      show_alerta("INGRESA EL user DEL PRODUCTO", "warning");
    } else if (email.trim() === "") {
      show_alerta("INGRESA EL email DEL PRODUCTO", "warning");
    } else {
      if (operation === 1) {
        parametros = {
          name: name.trim(),
          description: description.trim(),
          price: price.trim(),
          isAvailable: isAvailable.trim(),
          stock: stock.trim(),
          img: img.trim(),
        };
        metodo = "POST";
      } else {
        parametros = {
          id: id,
          name: name.trim(),
          description: description.trim(),
          price: price.trim(),
          isAvailable: isAvailable.trim(),
          stock: stock.trim(),
          img: img.trim(),
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
          /* getProducts(); */
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
      title: "Seguro de eliminar el producto" + name + "?",
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
                          <i className="fa fa"></i>
                        </span>
                        <input
                          type="text"
                          id="description"
                          className="form-control"
                          placeholder="Descripción"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa">$</i>
                        </span>
                        <input
                          type="number"
                          id="price"
                          className="form-control"
                          placeholder="Precio"
                          value={price}
                          onChange={(e) => setemail(e.target.value)}
                        ></input>
                      </div>
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
                          onChange={(e) => setDescription(e.target.value)}
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
                          onChange={(e) => setDescription(e.target.value)}
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fa fa"></i>
                        </span>
                        <input
                          type="text"
                          id="img"
                          className="form-control"
                          placeholder="Imagen"
                          value={img}
                          onChange={(e) => setDescription(e.target.value)}
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
                    <th>#</th>
                    <th>Productos</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Habilitable</th>
                    <th>Cantidad</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>
                        ${new Intl.NumberFormat("es-mx").format(product.price)}
                      </td>
                      <td>{product.isAvailable}</td>
                      <td>{product.stock}</td>
                      <td>{product.img}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              product.id,
                              product.name,
                              product.description,
                              product.price,
                              product.isAvailable,
                              product.stock,
                              product.img
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
                        <button
                          onClick={() =>
                            deleteProduct(product.id, product.name)
                          }
                          className="btn btn-success"
                        >
                          <i className="fa fa"></i>
                        </button>
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