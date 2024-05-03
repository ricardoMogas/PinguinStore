import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

function ListaDeObjetos({ datos }) {
  return (
    <Accordion>
      {datos.map((objeto) => (
        <Card key={objeto.id}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={objeto.id.toString()}>
              {objeto.nombre}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={objeto.id.toString()}>
            <Card.Body>{objeto.contenido}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}

export default ListaDeObjetos;