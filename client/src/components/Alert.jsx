import React from "react";
import { Container, Title, Message } from "./AlertStyles";

const Alert = ({ status, message }) => (
  <Container $error={status === "error"} $processing={status === "processing"}>
    <Title $error={status === "error"} $processing={status === "processing"}>
      {(status === "error" && "Error") ||
        (status === "processing" && "Processing") ||
        (status === "contractSuccess" && "Transaction Sent") ||
        (status === "serverSuccess" && "Completed")}
    </Title>
    <Message $error={status === "error"} $processing={status === "processing"}>
      {message}
    </Message>
  </Container>
);

export default Alert;
