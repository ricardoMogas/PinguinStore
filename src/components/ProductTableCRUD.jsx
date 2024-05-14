import React, { useState, useEffect } from "react";
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
import ProductsEndpoint from "../hook/ProductsEndpoint";
import { get } from "react-hook-form";
const ProductObject = new ProductsEndpoint(import.meta.env.VITE_REACT_APP_BASE_API);

const ProductTableCRUD = () => {
  const [supplier, setSupplier] = useState([]);
  const [dataState, setDataState] = useState({
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      supplierId: "",
    },
  });


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

  const showInsertModal = () => {
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

  const fetchDataProduct = async () => {
    const Result = await ProductObject.GetAllProducts();
    setDataProduct(Result.data);
  };

  const fetchDataSupplier = async () => {
    const result = await ProductObject.GetSalesSuppliers();
    if (result.status === true) {
      setSupplier(result.data);
    } else {
      alert("Error al obtener los proveedores");
    }
  };

  const editar = async (dato) => {
    const arreglo = [...dataState.data];
    const result = await ProductObject.UpdateProduct(dato);
    if (result.status === true) {
      alert("Producto actualizado correctamente");
    } else {
      alert("Error al actualizar el producto");
    }
    fetchDataProduct();
    setDataState({
      ...dataState,
      data: arreglo,
      modalActualizar: false,
    });
  };

  const eliminar = async (dato) => {
    const opcion = window.confirm(
      `Estás Seguro que deseas Eliminar el elemento ${dato.name}`
    );
    if (opcion === true) {
      const result = await ProductObject.DeleteProduct(dato.id);
      if (result.status === true) {
        alert("Producto eliminado correctamente");
      } else {
        alert("Error al eliminar el producto");
      }
      fetchDataProduct();
      setDataState({
        ...dataState,
        modalActualizar: false,
      });
    }
  };

  const insertar = async () => {
    const newValue = { ...dataState.form };
    const Result = await ProductObject.RegisterProduct(newValue);
    if (Result.status === true) {
      alert("Producto insertado correctamente");
    } else {
      alert("Error al insertar el producto");
    }
    fetchDataProduct();
    setDataState({
      ...dataState,
      modalInsertar: false,
    });
  };

  const handleChangeProduct = (e) => {
    setDataState({
      ...dataState,
      form: {
        ...dataState.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeSupplier = (e) => {
    setDataState({
      ...dataState,
      form: {
        ...dataState.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    fetchDataSupplier();
    fetchDataProduct();
  }, []);

  const [dataProduct, setDataProduct] = useState([]);

  return (
    <>
      <Container>
        <h1>CRUD DE PRODUCTOS</h1>
        <Button className="m-2" color="success" onClick={() => showInsertModal()}>
          <i className="fa fa-plus"></i> Insertar
        </Button>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Proveedor</th>
              <th>Precio</th>
              <th>Habilitado</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataProduct.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.name}</td>
                <td>{dato.description}</td>
                <td>{dato.nameSupplier}</td>
                <td>{dato.price}</td>
                <td>{dato.stock === 0 ? "Sin Stock" : "Disponible"}</td>
                <td>{dato.stock}</td>
                <td>{dato.pathImage}</td>
                <td>
                  <Button color="primary" onClick={() => mostrarModalActualizar(dato)}>
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
      {/**** MODAL ACTUALIZAR****/}
      <Modal isOpen={dataState.modalActualizar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChangeProduct}
              value={dataState.form.name}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              name="description"
              type="text"
              onChange={handleChangeProduct}
              value={dataState.form.description}
            />
          </FormGroup>
          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              name="price"
              type="text"
              onChange={handleChangeProduct}
              value={dataState.form.price}
            />
          </FormGroup>
          <FormGroup>
            <label>Cantidad:</label>
            <input
              className="form-control"
              name="stock"
              type="text"
              onChange={handleChangeProduct}
              value={dataState.form.stock}
            />
          </FormGroup>
          <FormGroup>
            <label>Imagen:</label>
            <input
              className="form-control"
              name="pathImage"
              type="text"
              onChange={handleChangeProduct}
              value={dataState.form.image}
            />
          </FormGroup>
          <FormGroup>
            <label className="form-label">Proveedor :</label>
            <select
              className="form-select"
              name="Proveedor"
              value={dataState.form.supplierId}
              onChange={handleChangeSupplier}
            >
              {supplier.map((opcion) => (
                <option
                  key={opcion.id}
                  value={opcion.id}
                >
                  {opcion.name}
                </option>
              ))}
            </select>
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
      {/**** MODAL INSERTAR  ****/}
      <Modal isOpen={dataState.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChangeProduct}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              name="description"
              type="text"
              onChange={handleChangeProduct}
            />
          </FormGroup>
          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              name="price"
              type="text"
              onChange={handleChangeProduct}
            />
          </FormGroup>
          <FormGroup>
            <label>Cantidad:</label>
            <input
              className="form-control"
              name="stock"
              type="text"
              onChange={handleChangeProduct}
            />
          </FormGroup>
          <FormGroup>
            <label>Imagen:</label>
            <input
              className="form-control"
              name="pathImage"
              type="text"
              onChange={handleChangeProduct}
            />
          </FormGroup>
          <FormGroup>
            <label className="form-label">Proveedor :</label>
            <select
              className="form-select"
              name="supplierId"
              onChange={handleChangeSupplier}
            >
              {supplier.map((opcion) => (
                <option
                  key={opcion.id}
                  value={opcion.id}
                >
                  {opcion.name}
                </option>
              ))}
            </select>
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
    </>
  );
};

export default ProductTableCRUD;
