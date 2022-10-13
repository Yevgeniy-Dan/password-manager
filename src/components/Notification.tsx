import { Alert } from "react-bootstrap";
import NotificationModel from "../models/notification";

const Notification: React.FC<
  React.PropsWithChildren<{ notification: NotificationModel }>
> = ({ notification }) => {
  const variant =
    notification.status === "error"
      ? "danger"
      : notification.status === "pending"
      ? "primary"
      : "info";

  return <Alert variant={variant}>{notification.message}</Alert>;
};
export default Notification;
