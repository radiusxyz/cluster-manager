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
import { usePATCH } from "../hooks/useServer";

const Modal = ({ toggle }) => {
  const { address } = useAccount();

  const [clusterId, setClusterId] = useState("cluster_id");
  const [maxSequencerNumber, setMaxSequencerNumber] = useState(30);

  const [rollupId, setRollupId] = useState("rollup_id");
  const [executorAddress, setExecutorAddress] = useState(address);
  const [rollupType, setRollupType] = useState("polygon_cdk");
  const [orderCommitmentType, setOrderCommitmentType] =
    useState("transaction_hash");
  const [encryptedTransactionType, setEncryptedTransactionType] =
    useState("skde");
  const [platform, setPlatform] = useState("ethereum");
  const [serviceProvider, setServiceProvider] = useState("symbiotic");
  const [rpcUrl, setRpcUrl] = useState("https://www.google.ru/");
  const [webSocketUrl, setWebSocketUrl] = useState("https://www.naver.com/");
  const [blockExplorerUrl, setBlockExplorerUrl] = useState(
    "https://www.hello-world.com/"
  );

  const [step, setStep] = useState(1);
  const [transactionCompleted, setTransactionCompleted] = useState(false); // New state to track transaction completion

  const { write, hash, isHashPending } = useWrite();

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

  // Handle cluster initialization (Step 1)
  const handleInitializeCluster = () => {
    write("initializeCluster", [clusterId, maxSequencerNumber]);
    setTransactionCompleted(false); // Reset the flag when a new transaction begins
  };

  // Handle rollup addition (Step 2)
  const handleAddRollup = () => {
    write("addRollup", [
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
    ]);
    setTransactionCompleted(false); // Reset the flag when a new transaction begins
  };

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

  // Effect to move to the next step when the hash arrives and it's not pending
  useEffect(() => {
    console.log("hash", hash);

    // Only proceed if the transaction is not pending and it hasn't already triggered a step transition
    if (hash && !isHashPending && !transactionCompleted) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        toggle();
      }
      setTransactionCompleted(true); // Mark the transaction as completed, preventing multiple triggers
    }
  }, [hash, isHashPending, step, transactionCompleted]);

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          {(step === 1 && <span>Generate Cluster</span>) ||
            (step === 2 && <span>Add Rollup</span>) ||
            (step === 3 && <span>Add URLs</span>)}
        </Title>
        <StepsContainer>
          <Step $active={step === 1}></Step>
          <Step $active={step === 2}></Step>
          <Step $active={step === 3}></Step>
        </StepsContainer>
        {isHashPending ? (
          <Loader />
        ) : (
          (step === 1 && (
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
          )) ||
          (step === 2 && (
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
                  <SelectBox
                    onChange={(e) => setServiceProvider(e.target.value)}
                  >
                    <option defaultValue="symbiotic">Symbiotic</option>
                    <option value="eigen_layer">Eigenlayer</option>
                  </SelectBox>
                </InputContainer>
              </div>
            </>
          )) ||
          (step === 3 && (
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
          ))
        )}
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={handleInitializeCluster} disabled={step !== 1}>
              Initialize cluster
            </Button>
          </SubmitBtnContainer>
          <SubmitBtnContainer>
            <Button onClick={handleAddRollup} disabled={step !== 2}>
              Add Rollup
            </Button>
          </SubmitBtnContainer>
          <SubmitBtnContainer>
            <Button onClick={handleAddServerData} disabled={step !== 3}>
              Store Server Data
            </Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
