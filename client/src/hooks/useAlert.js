import { useState } from "react";

const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlert = (show, status, message, duration) => {
    setShowAlert(show);
    setAlertStatus(status);
    setAlertMessage(message);
    if (duration) {
      setTimeout(() => setShowAlert(false), duration);
    }
  };

  return {
    showAlert,
    alertStatus,
    alertMessage,
    handleAlert,
  };
};

export default useAlert;
