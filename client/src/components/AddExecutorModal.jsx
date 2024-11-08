import React from "react";

import { useEffect, useState } from "react";
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

const AddExecutorModal = ({ toggle }) => {
  const { address } = useAccount();

  // Step 1
  const [clusterId, setClusterId] = useState("cluster_id");

  // Step 2
  const [rollupId, setRollupId] = useState("rollup_id");
  const [rpcUrl, setRpcUrl] = useState("https://www.google.ru/");
  const [webSocketUrl, setWebSocketUrl] = useState("https://www.naver.com/");
  const [blockExplorerUrl, setBlockExplorerUrl] = useState(
    "https://www.hello-world.com/"
  );

  const [step, setStep] = useState(1);
  const [transactionCompleted, setTransactionCompleted] = useState(false); // New state to track transaction completion

  const {
    mutate: patchData,
    isLoading: isPatchLoading,
    isError: isPatchError,
    error: patchError,
  } = usePATCH(`http://localhost:3333/api/v1/clusters/${clusterId}`, {
    onSuccess: (data) => {
      console.log("Resource updated successfully:", data);
    },
    onError: (error) => {
      console.log(data);

      console.error("Error updating resource:", error);
    },
  });

  const handleAddServerData = () => {
    const data = {
      rollupId,
      executorAddress: address,
      rpcUrl,
      blockExplorerUrl,
      websocketUrl: webSocketUrl,
    };
    patchData(data);
    console.log("data", data);
    if (!isPatchError) {
      setTransactionCompleted(false);
    }
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Add URLs</span>
        </Title>

        {false ? (
          <Loader />
        ) : (
          <>
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
            <Button onClick={handleAddServerData}>Store Server Data</Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default AddExecutorModal;
