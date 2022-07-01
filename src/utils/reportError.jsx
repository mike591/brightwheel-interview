import { notification } from "antd";

const reportError = ({ message, description }) => {
  notification.error({
    message,
    description,
  });
};

export default reportError;
