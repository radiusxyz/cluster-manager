import React from "react";
import { Container, Title, Message } from "./AlertStyles";

const Alert = ({
  error,
  processing,
  contractSuccess,
  serverSuccess,
  transactionHash,
}) => (
  <Container $error={error} $processing={processing}>
    <Title $error={error} $processing={processing}>
      {(error && "Error") ||
        (processing && "Processing") ||
        (contractSuccess && "Transaction Sent") ||
        (serverSuccess && "Completed")}
    </Title>
    <Message $error={error} $processing={processing}>
      {(error && error) ||
        (processing && "Awaiting server update...") ||
        (contractSuccess && `Transaction hash: ${transactionHash}`) ||
        (serverSuccess && "Successfully updated the server.")}
    </Message>
  </Container>
);

export default Alert;
