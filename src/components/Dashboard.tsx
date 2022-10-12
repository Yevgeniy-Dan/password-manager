import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch } from "../hooks/redux";
import { fetchPasswordCardsData } from "../store/password-cards-actions";
import PasswordCard from "./PasswordCard";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPasswordCardsData());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Container>
        <Row>
          <Col sm={6} md={4}>
            <PasswordCard type="addCard" />
          </Col>
          <Col sm={6} md={4}>
            <PasswordCard
              card={{
                id: "1",
                password: "123456",
                serviceName: "Git",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
