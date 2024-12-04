import React from "react";
import {
  Buttons,
  Input,
  InputContainer,
  Label,
  ModalContainer,
  Overlay,
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";
import Button from "./Button";

const ExecutorModal = ({ toggle, executor }) => {
  const handleClose = () => toggle();

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Executor Details</span>
        </Title>
        <InputContainer>
          <Label>Address</Label>
          <Input readOnly value={executor.address} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>RPC URL</Label>
          <Input readOnly value={executor.rpcUrl} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Block Explorer URL</Label>
          <Input readOnly value={executor.blockExplorerUrl} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>WebSocket URK</Label>
          <Input readOnly value={executor.websocketUrl} type="text" />
        </InputContainer>{" "}
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={handleClose}>Close</Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default ExecutorModal;
