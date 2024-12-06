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
import { vaultAbi } from "../../../common";
import { useReadContract } from "wagmi";

const VaultModal = ({ toggle, vault }) => {
  const handleClose = () => toggle();
  console.log(vault);

  const contractConfig = vault
    ? {
        address: vault,
        abi: vaultAbi,
      }
    : null;

  const { data: isInitialized } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "isInitialized",
  });
  const { data: totalStake } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "totalStake",
  });

  const { data: owner } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "owner",
  });

  const { data: collateral } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "collateral",
  });

  const { data: epochDuration } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "epochDuration",
  });

  const { data: burner } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "burner",
  });

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
          <Input readOnly value={vault} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Is Initialized</Label>
          <Input readOnly value={isInitialized || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Total Stake</Label>
          <Input readOnly value={String(totalStake) || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Owner</Label>
          <Input readOnly value={owner || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Collateral</Label>
          <Input readOnly value={collateral || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Epoch Duration</Label>
          <Input readOnly value={epochDuration || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Burner</Label>
          <Input readOnly value={burner || ""} type="text" />
        </InputContainer>
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
