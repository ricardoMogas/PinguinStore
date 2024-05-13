export default function NavBarComponent({ name, userId, shoppingItem, cartShoppingIcon, seeBarIcon }) {
  // console.log('ID de usario:',userId);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [concepts, setConcepts] = useState([shoppingItem])

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    // console.log(sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    setConcepts(shoppingItem);
  }, [shoppingItem]);
  //const userData = location.state.value;
  const order = () => {
    //Objeto Final
    const orderItem = {
      userId: 0,
      concepts:[]
    }
    orderItem.concepts = concepts;
    orderItem.userId = userId;
    // console.log(orderItem);
    navigate("/order", {
      state: {
        order: orderItem,
        name: name,
        id: userId
      }
    });
  }
  const conceptsCopy = [

    {
      ProductId: 0,
      name: "elemento1",
      import: 0,
      quawntity: 0,
    },
    {
      ProductId: 1,
      name: "elemento2",
      import: 0,
      quantity: 0,
    }
  ]
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        {seeBarIcon ? (
          <div className="navbar-brand">
            <button type="button" className="btn btn-black" onClick={toggleSidebar}>
              {sidebarOpen ?
                <img src={x} alt="Barra Lateral" style={{ width: "30px", height: "30px" }} />
                :
                <img src={bars} alt="Barra Lateral" style={{ width: "30px", height: "30px" }} />
              }
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="collapse navbar-collapse" id="navbarNav">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "40px" }}
          />
        </div>
        {cartShoppingIcon ? (
          <button type="button" className="btn ml-auto btn-black" onClick={handleShow}>
            <img src={cartShopping} alt="Canasta" style={{ width: "30px", height: "30px" }} />
            <Badge bg="danger" text="dark">{shoppingItem.length}</Badge>
          </button>
        ) : (
          <h1></h1>
        )}

      </nav>
      {/* -------------------- sidebar pefil -------------------- */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} name={name} id={userId}/>

      {/* -------------------- sidebar Carrito de compras -------------------- */}
      {cartShoppingIcon ? (
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            <h1>Carrito de compras</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {concepts.length > 0 ? (
            <div>
              {concepts.map((elemento, index) => (
                <div key={index}>
                  <Accordion defaultActiveKey='0' flush>
                    <Accordion.Item eventKey='0' >
                      <Accordion.Header>{elemento.name}</Accordion.Header>
                      <Accordion.Body>
                        <p>Importe: {elemento.price}</p>
                        <p>Cantidad: {elemento.quantity}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <p>El carrito esta Vacio</p>
          )}
          {concepts.length > 0 ? (
            <div>
              <button className="button-buy" onClick={() => order()}>
                <span className="text">Pagar</span>
              </button>
            </div>
          ) : (
            <button className="button-buy-disabled">
              <span className="text">Pagar</span>
            </button>
          )
          }
        </Offcanvas.Body>
      </Offcanvas>
      ) : (
        <div></div>
      )}
    </>
  );
}
import "../css/NavBarComponent.css";
import React from "react";
import img from "../assets/LogoTecnoPSinFondo.png";
import bars from "../assets/bars.svg";
import cartShopping from "../assets/cartShopping.svg";
import x from "../assets/x.svg"
import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";

import { Offcanvas, ListGroup, Accordion, Button, Badge } from 'react-bootstrap';
import { json, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';