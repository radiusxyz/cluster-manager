import React, { useEffect, useState } from "react";
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
import { livenessRadiusAbi, livenessRadius } from "../../../common";

const AddRollupModal = ({ toggle, clusterId }) => {
  const { address } = useAccount();
  const initialFormState = {
    rollupId: "rollup_id",
    executorAddress: address,
    rollupType: "polygon_cdk",
    orderCommitmentType: "transaction_hash",
    encryptedTransactionType: "skde",
    platform: "ethereum",
    serviceProvider: "symbiotic",
    validationServiceManager: "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (field) => (e) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const { writeContract, data, isPending, error } = useWriteContract();

  const handleAddRollup = () => {
    writeContract({
      abi: livenessRadiusAbi,
      address: livenessRadius,
      functionName: "addRollup",
      args: [
        clusterId,
        {
          ...formState,
          owner: address,
          validationInfo: {
            platform: formState.platform,
            serviceProvider: formState.serviceProvider,
            validationServiceManager: formState.validationServiceManager,
          },
        },
      ],
      account: address,
    });
  };

  useEffect(() => {
    if (error) {
      console.error("Error adding rollup:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log("Rollup added successfully:", data);
      toggle();
    }
  }, [data]);

  return (
    <Overlay onClick={toggle}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
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
                value={formState.rollupId}
                type="text"
                onChange={handleChange("rollupId")}
              />
            </InputContainer>

            <InputContainer>
              <Label>Executor Address</Label>
              <Input
                value={formState.executorAddress}
                type="text"
                onChange={handleChange("executorAddress")}
              />
            </InputContainer>

            <InputContainer>
              <Label>Rollup Type</Label>
              <SelectBox
                value={formState.rollupType}
                onChange={handleChange("rollupType")}
              >
                <option value="polygon_cdk">Polygon CDK</option>
              </SelectBox>
            </InputContainer>

            <InputContainer>
              <Label>Encrypted Transaction Type</Label>
              <SelectBox
                value={formState.encryptedTransactionType}
                onChange={handleChange("encryptedTransactionType")}
              >
                <option value="skde">SKDE</option>
                <option value="pvde">PVDE</option>
              </SelectBox>
            </InputContainer>

            <InputContainer>
              <Label>Order Commitment Type</Label>
              <SelectBox
                value={formState.orderCommitmentType}
                onChange={handleChange("orderCommitmentType")}
              >
                <option value="transaction_hash">Transaction Hash</option>
                <option value="sign">Sign</option>
              </SelectBox>
            </InputContainer>

            <InputContainer>
              <Label>Platform</Label>
              <SelectBox
                value={formState.platform}
                onChange={handleChange("platform")}
              >
                <option value="ethereum">Ethereum</option>
              </SelectBox>
            </InputContainer>

            <InputContainer>
              <Label>Service Provider</Label>
              <SelectBox
                value={formState.serviceProvider}
                onChange={handleChange("serviceProvider")}
              >
                <option value="symbiotic">Symbiotic</option>
                <option value="eigen_layer">Eigen Layer</option>
              </SelectBox>
            </InputContainer>

            {formState.serviceProvider === "symbiotic" && (
              <InputContainer>
                <SubLabel>Contract Address</SubLabel>
                <Input
                  value={formState.validationServiceManager}
                  type="text"
                  onChange={handleChange("validationServiceManager")}
                />
              </InputContainer>
            )}

            <Buttons>
              <SubmitBtnContainer>
                <Button
                  onClick={handleAddRollup}
                  disabled={!formState.rollupId}
                >
                  Add Rollup
                </Button>
              </SubmitBtnContainer>
            </Buttons>
          </>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default AddRollupModal;
