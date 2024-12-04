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

const OperatorModal = ({ toggle, operator }) => {
  const handleClose = () => toggle();

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Operator Details</span>
        </Title>
        <InputContainer>
          <Label>Idle Address</Label>
          <Input readOnly value={operator.address} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Operating Address</Label>
          <Input readOnly value={operator.address} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Total Stake</Label>
          <Input readOnly value={operator.owner} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Token A</Label>
          <Input readOnly value={operator.collateral} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Token B</Label>
          <Input readOnly value={operator.burner} type="text" />
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

export default OperatorModal;
