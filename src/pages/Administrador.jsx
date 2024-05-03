import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Administrador.css";
import { NavbarAdm } from "../components/NavbarAdm";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export const Administrador = () => {
  const url = import.meta.env.VITE_REACT_APP_BASE_API;
  
  const [dataState, setDataState] = useState({
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      description: "",
      price: "",
      available: "",
      stock: "",
      pathImage: "",
    },
  });

  useEffect(() => {
    // Realizar la solicitud GET para obtener los datos
    fetch(`${url}/Products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no se pudo completar correctamente.");
        }
        return response.json();
      })
      .then((responseData) => {
        setDataState({
          ...dataState,
          data: responseData.data.products,
        });
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud GET:", error);
      });
  }, []); // El segundo argumento [] indica que este efecto se ejecutará solo una vez al montar el componente

  const mostrarModalActualizar = (dato) => {
    setDataState({
      ...dataState,
      form: dato,
      modalActualizar: true,
    });
  };

  const cerrarModalActualizar = () => {
    setDataState({
      ...dataState,
      modalActualizar: false,
    });
  };

  const mostrarModalInsertar = () => {
    setDataState({
      ...dataState,
      modalInsertar: true,
    });
  };

  const cerrarModalInsertar = () => {
    setDataState({
      ...dataState,
      modalInsertar: false,
    });
  };

  const editar = (dato) => {
    const arreglo = [...dataState.data];
    arreglo.forEach((registro, index) => {
      if (dato.id === registro.id) {
        arreglo[index].name = dato.name;
        arreglo[index].description = dato.description;
        arreglo[index].price = dato.price;
        arreglo[index].available = dato.available;
        arreglo[index].stock = dato.stock;
        arreglo[index].pathImage = dato.pathImage;
      }
    });
    setDataState({
      ...dataState,
      data: arreglo,
      modalActualizar: false,
    });
  };

  const eliminar = (dato) => {
    const opcion = window.confirm(
      `Estás Seguro que deseas Eliminar el elemento ${dato.id}`
    );
    if (opcion === true) {
      const arreglo = [...dataState.data].filter(
        (registro) => dato.id !== registro.id
      );
      setDataState({
        ...dataState,
        data: arreglo,
        modalActualizar: false,
      });
    }
  };

  const insertar = () => {
    const valorNuevo = { ...dataState.form };
    valorNuevo.id = dataState.data.length + 1;
    const lista = [...dataState.data];
    lista.push(valorNuevo);
    setDataState({
      ...dataState,
      modalInsertar: false,
      data: lista,
    });
  };

  const handleChange = (e) => {
    setDataState({
      ...dataState,
      form: {
        ...dataState.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <NavbarAdm name={"nombre"} />
      <div className="yellow template justify-content-center align-items-center 100-w vh-100 ">
        <Container>
          <br />
          <Button color="success" onClick={() => mostrarModalInsertar()}>
            <i className="fa fa-plus"></i> Insertar
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Habilitado</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataState.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.description}</td>
                  <td>{dato.price}</td>
                  <td>{dato.available}</td>
                  <td>{dato.stock}</td>
                  <td>{dato.pathImage}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => mostrarModalActualizar(dato)}
                    >
                      <i className="fa fa-edit"></i>
                    </Button>{" "}
                    <Button color="danger" onClick={() => eliminar(dato)}>
                      <i className="fa fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={dataState.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={dataState.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={handleChange}
                value={dataState.form.name}
              />
            </FormGroup>

            <FormGroup>
              <label>Descripcion:</label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={handleChange}
                value={dataState.form.description}
              />
            </FormGroup>
            <FormGroup>
              <label>Precio:</label>
              <input
                className="form-control"
                name="price"
                type="text"
                onChange={handleChange}
                value={dataState.form.price}
              />
            </FormGroup>
            <FormGroup>
              <label>Habilitado:</label>
              <input
                className="form-control"
                name="available"
                type="text"
                onChange={handleChange}
                value={dataState.form.available}
              />
            </FormGroup>
            <FormGroup>
              <label>Cantidad:</label>
              <input
                className="form-control"
                name="stock"
                type="text"
                onChange={handleChange}
                value={dataState.form.stock}
              />
            </FormGroup>
            <FormGroup>
              <label>Imagen:</label>
              <input
                className="form-control"
                name="pathImage"
                type="text"
                onChange={handleChange}
                value={dataState.form.pathImage}
                />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => editar(dataState.form)}>
                  Editar
                </Button>
                <Button color="danger" onClick={() => cerrarModalActualizar()}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={dataState.modalInsertar}>
              <ModalHeader>
                <div>
                  <h3>Insertar Personaje</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={dataState.data.length + 1}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Nombre:</label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Descripcion:</label>
                  <input
                    className="form-control"
                    name="description"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Precio:</label>
                  <input
                    className="form-control"
                    name="price"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Habilitadad:</label>
                  <input
                    className="form-control"
                    name="available"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Cantidad:</label>
                  <input
                    className="form-control"
                    name="stock"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Imagen:</label>
                  <input
                    className="form-control"
                    name="pathImage"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => insertar()}>
                  <i className="fa fa-floppy-disk"></i> Guardar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => cerrarModalInsertar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </>
      );
    };