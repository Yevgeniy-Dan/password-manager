import React, { useState, useRef } from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../hooks/redux";
import { passwordCardsActions } from "../../store/dashboard/password-cards-slice";
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";

import PasswordCard from "../../models/password-card";

const PasswordCardModal: React.FC<
  React.PropsWithChildren<{
    show: boolean;
    cardData?: PasswordCard;
    onSubmit: () => void;
  }>
> = ({ show, cardData, onSubmit }) => {
  const [showPass, setShowPass] = useState(false);

  const serviceNameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [validated, setValidated] = useState(false);

  const dispatch = useAppDispatch();

  const closeHandle = () => {
    clearForm();
    onSubmit();
  };

  const submitHandler = (event: React.FormEvent) => {
    setValidated(true);
    event.preventDefault();

    const serviceName = serviceNameInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    const form = event.currentTarget;
    if ((form as HTMLButtonElement).checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (cardData) {
        dispatch(
          passwordCardsActions.editCard({
            editItem: { id: cardData.id, serviceName, password },
          })
        );
      } else {
        const newCard = new PasswordCard(serviceName, password);
        dispatch(
          passwordCardsActions.addCardToCards({
            item: { ...newCard },
          })
        );
      }
      closeHandle();
    }
  };

  const deleteHandler = () => {
    cardData &&
      dispatch(
        passwordCardsActions.removeCardFromCards({ item: { ...cardData } })
      );
  };

  const clearForm = () => {
    setValidated(false);
  };

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  return (
    <Modal show={show} onHide={closeHandle} centered>
      <Modal.Header closeButton>
        <Modal.Title>{cardData ? "Edit" : "Add"} Password Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              required
              type="text"
              ref={serviceNameInputRef}
              defaultValue={cardData?.serviceName || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid service name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                ref={passwordInputRef}
                type={showPass ? "text" : "password"}
                defaultValue={cardData?.password || ""}
              />
              <InputGroup.Text>
                {showPass ? (
                  <IoEyeSharp onClick={showPassHandler} size={25} />
                ) : (
                  <IoEyeOff onClick={showPassHandler} size={25} />
                )}
              </InputGroup.Text>

              <Form.Control.Feedback type="invalid">
                Please provide a valid password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Modal.Footer className="pb-0 px-0 d-flex justify-content-between">
            <Col>
              {cardData && (
                <Button variant="danger" onClick={deleteHandler}>
                  Delete
                </Button>
              )}
            </Col>
            <Col className="d-flex justify-content-between">
              <Button variant="secondary" onClick={closeHandle}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Col>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordCardModal;
