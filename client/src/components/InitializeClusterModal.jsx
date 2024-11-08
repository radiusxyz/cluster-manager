import React from "react";

import { useEffect, useState } from "react";
import Button from "./Button";
import { useAccount } from "wagmi";
import useWrite from "../hooks/useContract";
import Loader from "./Loader";
import {
  Buttons,
  Input,
  InputContainer,
  Label,
  ModalContainer,
  Overlay,
  SelectBox,
  Step,
  StepsContainer,
  SubLabel,
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";

const InitializeClusterModal = ({ toggle }) => {
  const { address } = useAccount();

  const [clusterId, setClusterId] = useState("cluster_id");
  const [maxSequencerNumber, setMaxSequencerNumber] = useState(30);

  const [step, setStep] = useState(1);
  const [transactionCompleted, setTransactionCompleted] = useState(false); // New state to track transaction completion

  const { write, hash, isHashPending } = useWrite();

  // Handle cluster initialization (Step 1)
  const handleInitializeCluster = () => {
    write("initializeCluster", [clusterId, maxSequencerNumber]);
    setTransactionCompleted(false); // Reset the flag when a new transaction begins
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Generate Cluster</span>
        </Title>

        {isHashPending ? (
          <Loader />
        ) : (
          <>
            <InputContainer>
              <Label>Cluster Id</Label>
              <Input
                value={clusterId}
                type="text"
                onChange={(e) => {
                  setClusterId(e.target.value);
                }}
              />
            </InputContainer>{" "}
            <InputContainer>
              <Label>Max # of sequencers</Label>
              <Input
                value={maxSequencerNumber}
                type="text"
                onChange={(e) => {
                  setMaxSequencerNumber(e.target.value);
                }}
              />
            </InputContainer>{" "}
          </>
        )}
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={handleInitializeCluster} disabled={step !== 1}>
              Initialize cluster
            </Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default InitializeClusterModal;
