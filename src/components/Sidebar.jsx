// Sidebar.jsx
function Sidebar({ isOpen, toggleSidebar, name }) {
  const [loading, setLoanding] = useState(true);
  const [items, setItems] = useState([
    { id: 1, text: 'Marquesitas' },
    { id: 2, text: 'Chamoyadas' },
    { id: 3, text: 'Waffles' },
    { id: 4, text: 'Hotcake' },
  ]);
  const [history, setHistory] = useState();
  const [lengthHistory, setLengthHistory] = useState(0);
  const role = localStorage.getItem("rol");
  const GetSalesCustomer = async () => {
    const sales = await ProductObject.GetSalesCustomer(localStorage.getItem("id"));
    setHistory(sales.data);
    setLengthHistory(sales.data.length);
  };

  useEffect(() => {
    // Realiza la solicitud GET cuando el componente se monta
    //setLoanding(true)
    //console.log(role)
    GetSalesCustomer();
    console.log(history)
    const baseApiUrl = import.meta.env.VITE_REACT_APP_BASE_API;
    console.log(baseApiUrl);
  }, []);
  return (
    <Offcanvas show={isOpen} onHide={toggleSidebar} placement="start" backdropClassName="custom-backdrop">
      <Offcanvas.Header >
        <Offcanvas.Title >
          <h1>Bienvenido {name}</h1>
          <div className='text-center'>
            <button
              type="submit"
              className="custom-btn"
              content="Cerrar sesión"
            >
              <Link to="/">Cerrar sesión</Link>
            </button>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {role === "1" ? (
          <div className='text-center'>
            <h1>Historial</h1>
            {lengthHistory > 0 ? (
              <div>
                {history.map((elemento, index) => (
                  <Accordion defaultActiveKey='0' flush>
                    <Accordion.Item eventKey='0' >
                      <Accordion.Header>
                        <h5>Id Compra: {elemento._id}</h5>
                        <h4>Total: {elemento.total}$</h4>
                      </Accordion.Header>
                      <Accordion.Body>
                        {elemento.concepts.map((elemento, index) => (
                          <p>Nombre: {elemento.product}</p>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </div>
            ) : (
              <p>No tiene compras hechas</p>
            )}
          </div>
        ) : (
          <h1>CRUDS</h1>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
import React from 'react';
import { Offcanvas, ListGroup, Button, Row, Col, Accordion } from 'react-bootstrap';
import '../css/Sidebar.css';
import chevronRight from "../assets/chevron-right.svg"
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductsEndpoint from '../hook/ProductsEndpoint';
const ProductObject = new ProductsEndpoint(import.meta.env.VITE_REACT_APP_BASE_API);
