import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { signIn } from "../store/auth-actions";
import classes from "./Login.module.css";

const Register: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const signInHandle = async (event: React.FormEvent) => {
    event.preventDefault();

    const origin = location.state?.from?.pathname || "/dashboard";

    await signIn(loginInputRef.current!.value, passwordInputRef.current!.value);

    navigate(origin);
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
