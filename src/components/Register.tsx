import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/redux";
import { signIn } from "../store/auth-actions";
import classes from "./Login.module.css";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const signInHandle = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      signIn(loginInputRef.current!.value, passwordInputRef.current!.value)
    );
  };

  return (
    <div
      className={`${classes.fullScreen} d-flex  justify-content-center align-items-center`}
    >
      <Container
        className={` d-flex  justify-content-center align-items-center`}
      >
        <Form onSubmit={signInHandle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={loginInputRef}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
