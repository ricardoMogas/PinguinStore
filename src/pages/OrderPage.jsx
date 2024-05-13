import React from 'react'
import { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Button, Modal, Spinner } from "react-bootstrap";
import NavBarComponent from "../components/NavBarComponent";
import "../css/OrderPage.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const OrderPage = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.id;
    const userName = location.state.name;
    const concepts = location.state.order.concepts;
    const total = concepts.reduce((suma, objeto) => suma + objeto.total, 0);
    const backToHome = () => {
        console.log(show);
        setShow(false)
        navigate("/home", {
            state: {
                name: userName,
                id: userId,
            }
        });
    }
    const payProducts = async () => {
        setShow(true);
        setIsLoading(true);
        // Realizar una solicitud HTTP para autenticar al usuario y obtener un token JWT
        const baseApiUrl = import.meta.env.VITE_REACT_APP_BASE_API;
        const dataResponse = {
            userId: userId,
            total: total,
            concepts: concepts
        }
        try {
            const response = await axios.post(`${baseApiUrl}/RegisterSales`, dataResponse);
            const product = response.data;
            console.log(product);
        } catch (error) {
            console.error('Error registering product:', error);
            alert("error al pagar")
            setIsLoading(false);
        }
        //console.log(location.state.order);
        setIsLoading(false);

    }
    return (
        <>
            <NavBarComponent name={"x"} cartShoppingIcon={false} seeBarIcon={false} userId={userId} />
            <div className="Fondo template justify-content-center align-items-center 100-w vh-100">
                <Button variant="dark" style={{ margin: '10px' }} onClick={() => backToHome()}>
                    Regresar
                </Button>
                <Container>
                    {/* Stack the columns on mobile by making one full-width and the other half-width */}
                    <Row>
                        <Col sm={8}>
                            <Card>
                                <Card.Header>Dirección de entrega</Card.Header>
                                <Card.Body>
                                    <Card.Title>Av. López Portillo, Campeche,México</Card.Title>
                                    <Card.Text>
                                        Instrucciones de entrega (opcional):
                                        <br></br>
                                        <input className='custom-input' type="text" placeholder='Detalles' />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header className='card-header-resume'>Productos</Card.Header>
                                <Card.Body>
                                    <Row>
                                        {concepts.map((orderItem, index) => (
                                            <Col key={index} md={3}>
                                                <Card>
                                                    <Card.Img className='img-custom' src={`data:image/jpeg;base64,${orderItem.image}`} alt={orderItem.name} />
                                                    <Card.Body>
                                                        <Card.Title>{orderItem.name}</Card.Title>
                                                        <Card.Text>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>Metodo de pago</Card.Header>
                                <Card.Body>
                                    <Card.Title>Metodo</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Header className='card-header-resume'>Resumen</Card.Header>
                                <Card.Body>
                                    {concepts.map((elemento, index) => (
                                        <div key={index}>
                                            <h4>Producto: {elemento.name}</h4>
                                            Cantidad: {elemento.quantity}
                                            <br></br>
                                            Costo Productos: {elemento.price}
                                            <br></br>
                                            Total Costo: {elemento.total}
                                        </div>
                                    ))}
                                    <br></br>
                                    <h1>Total: {total}</h1>
                                </Card.Body>
                            </Card>
                            <Button className='button-order' size="lg" onClick={() => payProducts()}>Hacer pedido</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal
                size="sm"
                show={show}
                className="modal-con-fondo-azul"
            >
                <Modal.Header>
                    <Modal.Title>
                        Transacción
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <Spinner animation="grow" variant="warning" />
                    ) : (
                        <p>Compra exitosa</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={() => backToHome()}
                    >
                        seguir comprando
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}