import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { logIn } from "../store/auth-actions";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./Login.module.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const logInHandle = async (event: React.FormEvent) => {
    event.preventDefault();

    const origin = location.state?.from?.pathname || "/dashboard";

    await logIn(loginInputRef.current!.value, passwordInputRef.current!.value);

    navigate(origin);
  };
  return (
    <div
      className={`${classes.fullScreen} d-flex  justify-content-center align-items-center`}
    >
      <Container
        className={`d-flex  justify-content-center align-items-center`}
      >
        <Form onSubmit={logInHandle}>
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
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
