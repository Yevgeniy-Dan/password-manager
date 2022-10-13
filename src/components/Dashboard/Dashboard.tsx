import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchPasswordCardsData,
  sendPasswordCardsData,
} from "../../store/dashboard/password-cards-actions";
import Notification from "../UI/Notification";
import PasswordCard, { EmptyPasswordCard } from "./PasswordCard";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const passwordCards = useAppSelector((state) => state.passwordCard);
  const notification = useAppSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchPasswordCardsData());
  }, [dispatch]);

  useEffect(() => {
    if (passwordCards.changed) {
      dispatch(sendPasswordCardsData(passwordCards.items));
    }
  }, [passwordCards, dispatch]);

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h1>Dashboard</h1>
      <Container>
        <Row>
          <Col sm={6} md={4}>
            <EmptyPasswordCard />
          </Col>
          {passwordCards.items.map((card) => {
            return (
              <Col sm={6} md={4} key={card.id}>
                <PasswordCard card={card} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
