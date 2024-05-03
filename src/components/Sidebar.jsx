// Sidebar.jsx
function Sidebar({ isOpen, toggleSidebar, name, id }) {
  const [loading, setLoanding] = useState(true);
  const [items, setItems] = useState([
    { id: 1, text: 'Marquesitas' },
    { id: 2, text: 'Chamoyadas' },
    { id: 3, text: 'Waffles' },
    { id: 4, text: 'Hotcake' },
  ]);
  const [history, setHistory] = useState();
  const [lengthHistory, setLengthHistory] = useState(0);
  useEffect(() => {
    // Realiza la solicitud GET cuando el componente se monta
    //setLoanding(true)
    const baseApiUrl = import.meta.env.VITE_REACT_APP_BASE_API;
    fetch(`${baseApiUrl}/customer/sales/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no se pudo completar correctamente.');
        }
        return response.json();
      })
      .then((responseData) => {
        setHistory(responseData.data);
        setLengthHistory(responseData.data.length);
        //setLoading(false);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud GET:', error);
        //setLoading(false);
      });
  }, []);
  return (
    <Offcanvas show={isOpen} onHide={toggleSidebar} placement="start" backdropClassName="custom-backdrop">
      <Offcanvas.Header>
        <Offcanvas.Title>
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
        <h1>Historial</h1>
        {lengthHistory > 0 ?
          (
          <div>
            {history.map((elemento, index) => (
              <div key={index}>{elemento.idSale}</div>
            ))}
          </div>
          )
          :
          (
            <p>No tiene compras hechas</p>
          )}

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
import React from 'react';
import { Offcanvas, ListGroup, Button, Row, Col, Container } from 'react-bootstrap';
import '../css/Sidebar.css';
import chevronRight from "../assets/chevron-right.svg"
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
