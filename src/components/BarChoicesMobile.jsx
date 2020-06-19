import React from "react";
import { Accordion, Card } from "react-bootstrap";
import DropDownMobile from "./common/DropDownMobile";

function BarChoices({ spirits, mixers, liqueurs, others, onSelect }) {
  return (
    <div className="row justify-content-center mb-5">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Spirits
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <DropDownMobile items={spirits} onSelect={onSelect} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Liqueurs, Wines and Beers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <DropDownMobile items={liqueurs} onSelect={onSelect} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Mixers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <DropDownMobile items={mixers} onSelect={onSelect} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            Others
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <DropDownMobile items={others} onSelect={onSelect} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default BarChoices;
