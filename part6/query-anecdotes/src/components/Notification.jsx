import { useNotificationValue } from "../notificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notificationVal = useNotificationValue();
  if (notificationVal === "") return <div></div>;

  return <div style={style}>{notificationVal}</div>;
};

export default Notification;
