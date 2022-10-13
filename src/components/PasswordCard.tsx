import React, { useState } from "react";
import { Card } from "react-bootstrap";

import { IoAddOutline } from "react-icons/io5";
import classes from "./PasswordCard.module.css";
import PasswordCardModal from "./PasswordCardModal";

const PasswordCard: React.FC<
  React.PropsWithChildren<{
    card: { id: string; serviceName: string; password: string };
  }>
> = ({ card }) => {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };

  return (
    <>
      <Card
        className={`mb-4 d-flex align-items-center justify-content-center ${classes.card}`}
        onClick={showHandler}
      >
        <Card.Body className="d-flex justify-content-center align-items-center ">
          <Card.Title className="fs-1 d-flex justify-content-center">
            {card.serviceName}
          </Card.Title>
        </Card.Body>
      </Card>
      <PasswordCardModal show={show} onSubmit={showHandler} cardData={card} />
    </>
  );
};

export const EmptyPasswordCard: React.FC = () => {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };

  return (
    <>
      <Card
        className={`mb-4 d-flex align-items-center justify-content-center ${classes.card}`}
        onClick={showHandler}
      >
        <Card.Body className="d-flex justify-content-center align-items-center flex-column">
          <Card.Title className="d-flex justify-content-center">
            <IoAddOutline size={56} color="#1967d2" />
          </Card.Title>
          <Card.Subtitle className={`${classes.addCard} mb-2`}>
            Add Card
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <PasswordCardModal show={show} onSubmit={showHandler} />
    </>
  );
};

export default PasswordCard;
