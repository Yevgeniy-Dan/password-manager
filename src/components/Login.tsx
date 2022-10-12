import { useEffect, useRef } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { logIn } from "../store/auth-actions";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./Login.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const logInHandle = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      logIn(loginInputRef.current!.value, passwordInputRef.current!.value)
    );
  };

  useEffect(() => {
    const origin = location.state?.from?.pathname || "/dashboard";
    if (auth.isAuthenticated) navigate(origin);
  }, [auth.isAuthenticated, navigate, location]);

  return (
    <Container className={`d-flex  justify-content-center align-items-center`}>
      <Form onSubmit={logInHandle} className={classes.form}>
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

        {auth.authError && (
          <Form.Group className="mb-3">
            <Alert variant="danger">{auth.authError}</Alert>
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
