import React from "react";

import { useEffect, useState } from "react";
import Button from "./Button";
import { useAccount, useWriteContract } from "wagmi";
import Loader from "./Loader";
import {
  Buttons,
  Input,
  InputContainer,
  Label,
  ModalContainer,
  Overlay,
  SelectBox,
  SubLabel,
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";
import { contractAbi, contractAddress } from "../../../common";

const AddRollupModal = ({ toggle, clusterId }) => {
  const { address } = useAccount();

  const [rollupId, setRollupId] = useState("rollup_id");
  const [executorAddress, setExecutorAddress] = useState(address);
  const [rollupType, setRollupType] = useState("polygon_cdk");
  const [orderCommitmentType, setOrderCommitmentType] =
    useState("transaction_hash");
  const [encryptedTransactionType, setEncryptedTransactionType] =
    useState("skde");
  const [platform, setPlatform] = useState("ethereum");
  const [serviceProvider, setServiceProvider] = useState("symbiotic");

  const { writeContract, data, isPending } = useWriteContract();

  const handleAddRollup = () => {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "addRollup",
      args: [
        clusterId,
        {
          rollupId,
          rollupType,
          encryptedTransactionType,
          owner: address,
          orderCommitmentType,
          validationInfo: { platform, serviceProvider },
          executorAddress: address,
        },
      ],
      account: address,
    });
  };

  useEffect(() => {
    if (data) {
      console.log("Rollup added successfully:", data);
      toggle();
    }
  }, [data]);

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Add Rollup</span>
        </Title>

        {isPending ? (
          <Loader />
        ) : (
          <>
            <InputContainer>
              <Label>Rollup Id</Label>
              <Input
                value={rollupId}
                type="text"
                onChange={(e) => {
                  setRollupId(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Executor Address</Label>
              <Input
                value={executorAddress}
                type="text"
                onChange={(e) => {
                  setExecutorAddress(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Rollup Type</Label>
              <SelectBox onChange={(e) => setRollupType(e.target.value)}>
                <option defaultValue="polygon_cdk">Polygon CDK</option>
              </SelectBox>
            </InputContainer>{" "}
            <InputContainer>
              <Label>Encrypted Transaction Type</Label>
              <SelectBox
                onChange={(e) => setEncryptedTransactionType(e.target.value)}
              >
                <option defaultValue="skde">Skde</option>
                <option value="pvde">Pvde</option>
              </SelectBox>
            </InputContainer>{" "}
            <InputContainer>
              <Label>Order Commitment Type</Label>
              <SelectBox
                onChange={(e) => setOrderCommitmentType(e.target.value)}
              >
                <option defaultValue="transaction_hash">
                  Transaction Hash
                </option>
                <option value="sign">Sign</option>
              </SelectBox>
            </InputContainer>{" "}
            <InputContainer>
              <Label>Validation Info</Label>
            </InputContainer>{" "}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                paddingLeft: "15px",
              }}
            >
              <InputContainer>
                <SubLabel>Platform</SubLabel>
                <SelectBox onChange={(e) => setPlatform(e.target.value)}>
                  <option defaultValue="ethereum">Ethereum</option>
                </SelectBox>
              </InputContainer>{" "}
              <InputContainer>
                <SubLabel>Service provider</SubLabel>
                <SelectBox onChange={(e) => setServiceProvider(e.target.value)}>
                  <option defaultValue="symbiotic">Symbiotic</option>
                  <option value="eigen_layer">Eigenlayer</option>
                </SelectBox>
              </InputContainer>
            </div>
          </>
        )}
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={handleAddRollup} disabled={!rollupId}>
              Add Rollup
            </Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default AddRollupModal;
