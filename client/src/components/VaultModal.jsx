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

const VaultModal = ({ toggle, vault }) => {
  const handleClose = () => toggle();

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Vault Details</span>
        </Title>
        <InputContainer>
          <Label>Address</Label>
          <Input readOnly value={vault.address} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Owner</Label>
          <Input readOnly value={vault.owner} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Collateral</Label>
          <Input readOnly value={vault.collateral} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Burner</Label>
          <Input readOnly value={vault.burner} type="text" />
        </InputContainer>{" "}
        <InputContainer>
          <Label>Epoch Duration</Label>
          <Input readOnly value={vault.epochDuration} type="text" />
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

export default VaultModal;
