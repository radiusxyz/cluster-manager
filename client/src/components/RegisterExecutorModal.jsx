import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

import Button from "./Button";
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
import { contractAbi, contractAddress } from "../../../common";

const RegisterExecutorModal = ({ clusterId, rollupId, toggle }) => {
  const { address } = useAccount();
  const [executorAddress, setExecutorAddress] = useState("");

  const { writeContract, data, isPending, error } = useWriteContract();

  const handleRegisterExecutor = () => {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "registerRollupExecutor",
      args: [clusterId, rollupId, executorAddress],
      account: address,
    });
  };

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log("Executor registered successfully:", data);
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
          <span>Register Rollup Executor</span>
        </Title>

        {isPending ? (
          <Loader />
        ) : (
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
        )}
        <Buttons>
          <SubmitBtnContainer>
            <Button
              onClick={handleRegisterExecutor}
              disabled={!executorAddress}
            >
              Register Executor
            </Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default RegisterExecutorModal;
