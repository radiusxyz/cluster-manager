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
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";
import { livenessRadiusAbi, livenessRadius } from "../../../common";

const InitializeClusterModal = ({ toggle }) => {
  const { address } = useAccount();

  const [clusterId, setClusterId] = useState("cluster_id");
  const [maxSequencerNumber, setMaxSequencerNumber] = useState(30);

  const { writeContract, data, isPending } = useWriteContract();

  const handleInitializeCluster = () => {
    writeContract({
      abi: livenessRadiusAbi,
      address: livenessRadius,
      functionName: "initializeCluster",
      args: [clusterId, maxSequencerNumber],
      account: address,
    });
  };

  useEffect(() => {
    if (data) {
      console.log("Cluster initialized successfully:", data);
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
          <span>Generate Cluster</span>
        </Title>

        {isPending ? (
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
            <Button
              onClick={handleInitializeCluster}
              disabled={!clusterId || !maxSequencerNumber}
            >
              Initialize cluster
            </Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default InitializeClusterModal;
