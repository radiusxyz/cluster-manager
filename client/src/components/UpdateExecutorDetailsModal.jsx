import React, { useState } from "react";
import Button from "./Button";
import { useAccount } from "wagmi";
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
import { signMessage } from "@wagmi/core";
import { config, apiEndpoint } from "../config";
import { useMutation } from "@tanstack/react-query";
import { PATCH } from "../utils/api";

const UpdateExecutorDetailsModal = ({
  toggle,
  clusterId,
  rollupId,
  executor,
}) => {
  const { address } = useAccount();
  const [formState, setFormState] = useState({
    rpcUrl: executor.rpcUrl || "https://www.google.ru/",
    webSocketUrl: executor.webSocketUrl || "https://www.naver.com/",
    blockExplorerUrl:
      executor.blockExplorerUrl || "https://www.hello-world.com/",
  });

  const handleChange = (field) => (e) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const { mutate: updateExecutorDetails, isLoading: isPatchLoading } =
    useMutation({
      mutationFn: (data) => PATCH(`${apiEndpoint}/clusters/${clusterId}`, data),
      onSuccess: (data) => {
        console.log("Resource updated successfully:", data);
        toggle();
      },
      onError: (error) => {
        console.error("Error updating resource:", error);
      },
    });

  const handleUpdateExecutorDetails = async () => {
    const dataToSign = {
      from: address,
      rollupId,
      executorAddress: executor.address,
      ...formState,
    };

    const signature = await signMessage(config, {
      message: JSON.stringify(dataToSign),
    });

    updateExecutorDetails({ ...dataToSign, signature });
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>Update Executor Details</span>
        </Title>

        {isPatchLoading ? (
          <Loader />
        ) : (
          <>
            <InputContainer>
              <Label>Address</Label>
              <Input value={executor.address} readOnly type="text" />
            </InputContainer>

            <InputContainer>
              <Label>RPC URL</Label>
              <Input
                value={formState.rpcUrl}
                type="text"
                onChange={handleChange("rpcUrl")}
              />
            </InputContainer>

            <InputContainer>
              <Label>Web-Socket URL</Label>
              <Input
                value={formState.webSocketUrl}
                type="text"
                onChange={handleChange("webSocketUrl")}
              />
            </InputContainer>

            <InputContainer>
              <Label>Block Explorer URL</Label>
              <Input
                value={formState.blockExplorerUrl}
                type="text"
                onChange={handleChange("blockExplorerUrl")}
              />
            </InputContainer>
          </>
        )}

        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={handleUpdateExecutorDetails}>Update</Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default UpdateExecutorDetailsModal;
