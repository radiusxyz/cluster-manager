import React from "react";
import { Container, Title, Message } from "./AlertStyles";

const Alert = ({ error }) => (
  <Container error={error}>
    <Title>{error ? "Error" : "Success"}</Title>
    <Message>{error ? error : "Succesfully wrote to contract"}</Message>
  </Container>
);

export default Alert;
