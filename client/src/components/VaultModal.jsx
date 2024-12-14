import React, { useEffect } from "react";
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
import { useBlockNumber, useReadContracts } from "wagmi";

const VaultModal = ({ toggle, vault }) => {
  const contractConfig = vault ? { address: vault, abi: vaultAbi } : null;

  const { data, refetch } = useReadContracts({
    contracts: [
      { ...contractConfig, functionName: "isInitialized" },
      { ...contractConfig, functionName: "totalStake" },
      { ...contractConfig, functionName: "owner" },
      { ...contractConfig, functionName: "collateral" },
      { ...contractConfig, functionName: "epochDuration" },
      { ...contractConfig, functionName: "burner" },
    ],
    enabled: !!contractConfig,
  });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const [isInitialized, totalStake, owner, collateral, epochDuration, burner] =
    data || [];

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return (
    <Overlay onClick={toggle}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>Vault Details</span>
        </Title>
        <InputContainer>
          <Label>Address</Label>
          <Input readOnly value={vault} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Is Initialized</Label>
          <Input readOnly value={isInitialized?.result || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Total Stake</Label>
          <Input
            readOnly
            value={String(totalStake?.result) || ""}
            type="text"
          />
        </InputContainer>
        <InputContainer>
          <Label>Owner</Label>
          <Input readOnly value={owner?.result || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Collateral</Label>
          <Input readOnly value={collateral?.result || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Epoch Duration</Label>
          <Input readOnly value={epochDuration?.result || ""} type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Burner</Label>
          <Input readOnly value={burner?.result || ""} type="text" />
        </InputContainer>
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={toggle}>Close</Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default VaultModal;
