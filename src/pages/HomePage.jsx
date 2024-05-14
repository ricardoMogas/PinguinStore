import React, { useState, useEffect } from "react";
//import img from "../assets/LogoMarquesita.jpeg";
import "font-awesome/css/font-awesome.min.css";
import "../css/HomePage.css";
import ProductsEndpoint from "../hook/ProductsEndpoint";
import dummyData from "../data/dummyData.json";
import NavBarComponent from "../components/NavBarComponent";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button, Modal, Row, Col, Container, Spinner } from "react-bootstrap";
const productObject = new ProductsEndpoint(import.meta.env.VITE_REACT_APP_BASE_API);

export const HomePage = () => {
  const [sonData, setSonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const [modalShow, setModalShow] = React.useState(false)
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const initialObjeto = {};
  const [objeto, setObjeto] = useState(initialObjeto);

  //recibe datos del hijo con un evento
  const receiveDataChild = (data) => {
    const newObjectCopy = { ...data };
    setSonData([...sonData, newObjectCopy]);
    console.log(sonData);
  };

  const buttonKey = (newObject) => {
    console.log(newObject);
    setObjeto(newObject);
    setModalShow(true);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(product.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const esPar = currentItems.length % 3 === 0;

  const fetchData = async () => {
    setLoading(true);
    const Result = await productObject.GetAllProducts();
    console.log(Result.data);
    setProduct(Result.data)
    setLoading(false);
  };
  useEffect(() => {
    // Simulación de la solicitud GET
    fetchData();
  }, []);

  //optengo por medio de useLocation el state que se manda usando navegate
  const location = useLocation();
  const userName = location.state.name;
  const userId = location.state.id;

  return (
    <>
      <NavBarComponent name={userName} userId={userId} shoppingItem={sonData} seeBarIcon={true} cartShoppingIcon={true} />
      <div className="Fondo template justify-content-center align-items-center 100-w vh-100">
        {loading ? (
          <div className="center-spinner">
            <Spinner className="custom-spinner" animation="border" variant="black" />
          </div>
        ) : (
          <div>
            <h2 className="text-center p-4 mb-4">Tú tienda de tecnologia favorita</h2>
            <Container>
              <Row>
                {currentItems.map((product, index) => (
                  <Col key={index} sm={(esPar ? 4 : 5)}>
                    <div className="container">
                      <Button variant="" onClick={() => buttonKey(product)}>
                        <div className="card m-3" style={{ width: "18rem" }}>
                          <img src={`data:image/jpeg;base64,${product.image}`} className="card-img-top" alt="" />
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p>Descripción: <br /> {product.description}</p>
                            <p>Proveedor: {product.nameSupplier}</p>
                            <p>precio: {product.price}$</p>
                            <p>Disponibles: {product.stock}</p>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </Col>
                ))}
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={handleClose}
                  product={objeto}
                  sendDataToDad={receiveDataChild} //evento con el que se recibe datos del hijo
                />
              </Row>
            </Container>
            <Container className="center-container">
              <Row>
                <Col></Col>
                <Col xs={7}></Col>
                <Col className="text-center">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="dark"
                  >
                    <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                  </Button>
                </Col>
                <Col className="text-end">
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="dark"
                  >
                    <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
      
      <section className="footer">
        <h4 className="copyrightText">©PinguStore</h4>
        <h4 className="copyrightText">Siguenos en nuestras redes sociales</h4>
        <ul className="sci">
          <a href="">
            {" "}
            <li className="fa fa-facebook-square fa-2x" />
          </a>
          <a href="">
            <li className="fa fa-instagram fa-2x" />
          </a>
          <a href="">
            {" "}
            <li className="fa fa-whatsapp fa-2x" />
          </a>
        </ul>
      </section>
    </>
  );
};

function MyVerticallyCenteredModal({ show, onHide, product, sendDataToDad }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state.name;
  const userId = location.state.id;
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [sentData, setSentData] = useState(null);
  // Define un estado para el contador
  const [count, setCount] = useState(1);
  const [Data, setData] = useState(
    {
      productId: 0,
      name: "",
      price: 0,
      quantity: 0,
      image: "",
      total: 0,
      extraTotal: 0,
    }
  );
  const [extra, setExtra] = useState(0);
  const valor = product.price;
  const Total = (count * valor);
  const TotalExtra = extra * count;
  const TotalMas = Total + TotalExtra;


  // Función para enviar el arreglo de datos cuando se presiona el botón

  const sendData = () => {
    //copia del ojeto a enviar
    // Modifica el dato que deseas actualizar
    Data.productId = product.id
    Data.name = product.name
    Data.price = product.price;
    Data.quantity = count;
    Data.total = TotalMas;
    const ingredients = checked.map((elemento) => {
      return { ingredientId: elemento };
    });
    Data.extraTotal = TotalExtra;
    Data.image = product.image;
    setSentData(checked);
    sendDataToDad(Data); //envia los datos al padre
    console.log(checked);
    onHide(false);
    setCount(1)
  };


  // Función para incrementar el contador
  const increment = () => {
    setCount(count + 1);
  };

  // Función para decrementar el contador
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      console.log(TotalMas);
    }
  };

  const order = () => {
    // Objeto Concepto
    Data.productId = product.id
    Data.name = product.name
    Data.price = product.price;
    Data.quantity = count;
    Data.total = TotalMas;
    Data.extraTotal = TotalExtra;
    Data.image = product.image;
    //Objeto Final
    const orderItem = {
      userId: 0,
      concepts: []
    }
    orderItem.concepts = [...orderItem.concepts, Data];
    orderItem.userId = userId;
    console.log(orderItem);

    navigate("/order", {
      state: {
        order: orderItem,
        name: userName,
        id: userId
      }
    });
  }

  useEffect(() => {
  }, [onHide]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <h4>{product.name}</h4>
        <div className="modal-body">
          <div className="ContainerProduct d-flex justify-content-center flex-row mb-4">
            <div className="p-2 m-3">
              <h2></h2>
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                className="card-img-top"
                alt=""
                width={"150px"}
                height={"150px"}
              />
              <p className="Total">$ {TotalMas}</p>
              <div className="ContainerValor">
                <button className="btn btn-primary btn-sm" onClick={decrement}>
                  -
                </button>
                <input placeholder={count} />
                <button className="btn btn-primary btn-sm" onClick={increment}>
                  +
                </button>
              </div>
            </div>

            <div className="p-2 m-3 ">
              <h5>Descripcíon:</h5>
              <div className="overflow-auto" style={{ maxHeight: '200px' }}>
                <p>
                  {product.description}
                </p>
              </div>
              <h5>Proveedor</h5>
              <p>{product.nameSupplier}</p>
              <div className="ContainerButton p-2 d-flex flex-column ">
                <button
                  type="button"
                  className=" btn btn-success "
                  onClick={sendData}
                >
                  Agregar y Seguir comprando
                  {sentData && <pre>{JSON.stringify(sendData)}</pre>}
                </button>
                <button onClick={() => order()} type="button" className="btn btn-outline-success mb-2">
                  Agregar y pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

