import React from "react";
import { Card } from "react-bootstrap";

import { IoAddOutline } from "react-icons/io5";
import classes from "./PasswordCard.module.css";

const PasswordCard: React.FC<
  React.PropsWithChildren<{
    type?: string;
    card?: { id: string; serviceName: string; password: string };
  }>
> = ({ card, type }) => {
  return (
    <Card
      className={`mb-4 d-flex align-items-center justify-content-center ${classes.card}`}
    >
      <Card.Body className="d-flex justify-content-center flex-row">
        {type === "addCard" ? (
          <>
            <Card.Title className="d-flex justify-content-center">
              <IoAddOutline size={56} color="#1967d2" />
            </Card.Title>
            <Card.Subtitle className={`${classes.addCard} mb-2`}>
              Add Card
            </Card.Subtitle>
          </>
        ) : (
          <Card.Title className="fs-1">{card?.serviceName}</Card.Title>
        )}
      </Card.Body>
    </Card>
  );
};

export default PasswordCard;
