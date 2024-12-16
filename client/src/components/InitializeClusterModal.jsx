import React, { useState } from "react";
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
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";
import { livenessRadiusAbi, livenessRadius } from "../../../common";

const InitializeClusterModal = ({ toggle, handleAlert }) => {
  const { address } = useAccount();
  const [formState, setFormState] = useState({
    clusterId: "cluster_id",
    maxSequencerNumber: 30,
  });

  const handleChange = (field) => (e) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const { writeContract, isPending, error } = useWriteContract({
    mutation: {
      onSuccess: (data) => {
        handleAlert(true, "processing", `Transaction hash: ${data}`);
        toggle();
      },
      onError: (error) => {
        handleAlert(true, "error", error.message, 3000);
        toggle();
      },
    },
  });

  const handleInitializeCluster = () => {
    writeContract({
      abi: livenessRadiusAbi,
      address: livenessRadius,
      functionName: "initializeCluster",
      args: [formState.clusterId, formState.maxSequencerNumber],
      account: address,
    });
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>Generate Cluster</span>
        </Title>
        {isPending ? (
          <Loader />
        ) : (
          <>
            <InputContainer>
              <Label>Cluster Id</Label>
              <Input
                value={formState.clusterId}
                type="text"
                onChange={handleChange("clusterId")}
              />
            </InputContainer>

            <InputContainer>
              <Label>Max # of Sequencers</Label>
              <Input
                value={formState.maxSequencerNumber}
                type="number"
                onChange={handleChange("maxSequencerNumber")}
              />
            </InputContainer>

            <Buttons>
              <SubmitBtnContainer>
                <Button
                  onClick={handleInitializeCluster}
                  disabled={
                    !formState.clusterId || !formState.maxSequencerNumber
                  }
                >
                  Initialize Cluster
                </Button>
              </SubmitBtnContainer>
            </Buttons>
          </>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default InitializeClusterModal;
