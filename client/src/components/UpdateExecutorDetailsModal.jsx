import React from "react";

import { useState } from "react";
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
import { usePATCH } from "../hooks/useServer";
import { signMessage } from "@wagmi/core";
import { config, serverUrl } from "../config";

const UpdateExecutorDetailsModal = ({
  toggle,
  clusterId,
  rollupId,
  executor,
}) => {
  const { address } = useAccount();
  console.log("executor", executor);

  const [rpcUrl, setRpcUrl] = useState(
    executor.rpcUrl || "https://www.google.ru/"
  );
  const [webSocketUrl, setWebSocketUrl] = useState(
    executor.webSocketUrl || "https://www.naver.com/"
  );
  const [blockExplorerUrl, setBlockExplorerUrl] = useState(
    executor.blockExplorerUrl || "https://www.hello-world.com/"
  );

  const {
    mutate: patchData,
    isLoading: isPatchLoading,
    isError: isPatchError,
    error: patchError,
  } = usePATCH(`${serverUrl}/clusters/${clusterId}`, {
    onSuccess: (data) => {
      console.log("Resource updated successfully:", data);
      toggle();
    },
    onError: (error) => {
      console.log(data);

      console.error("Error updating resource:", error);
    },
  });

  const handleUpdateExecutorDetails = async () => {
    const dataToSign = {
      from: address,
      rollupId,
      executorAddress: executor.address,
      rpcUrl,
      blockExplorerUrl,
      webSocketUrl: webSocketUrl,
    };

    const signature = await signMessage(config, {
      message: JSON.stringify(dataToSign),
    });

    const dataToPatch = { ...dataToSign, signature: signature };

    patchData(dataToPatch);
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
                value={rpcUrl}
                type="text"
                onChange={(e) => {
                  setRpcUrl(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Web-Socket URL</Label>
              <Input
                type="text"
                value={webSocketUrl}
                onChange={(e) => {
                  setWebSocketUrl(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Block Explorer URL</Label>
              <Input
                value={blockExplorerUrl}
                type="text"
                onChange={(e) => {
                  setBlockExplorerUrl(e.target.value);
                }}
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
