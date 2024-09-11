import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useAccount } from "wagmi";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 100%;
  z-index: 2;
  max-width: 500px;
  border-radius: 10px;
  gap: 10px;
  padding: 30px;
  background-color: #fff;
  position: absolute;
`;

const StepsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Step = styled.div`
  border-radius: 50%;
  width: 20px;
  aspect-ratio: 1;
  background-color: ${(props) => (props.$active ? "#000" : "#ccc")};
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-weight: 600;
`;

const SubLabel = styled(Label)`
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const SelectBox = styled.select`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const Modal = ({ toggle }) => {
  const { address } = useAccount();

  // Step 1
  const [clusterId, setClusterId] = useState("A");
  const [maxSequencerNumber, setMaxSequencerNumber] = useState(30);

  // Step 2
  const [rollupId, setRollupId] = useState("1");
  const [chainType, setChainType] = useState("ethereum");
  const [orderCommitmentType, setOrderCommitmentType] =
    useState("orderCommitment");
  const [platform, setPlatform] = useState("ethereum");
  const [serviceProvider, setServiceProvider] = useState("eigenlayer");
  const [rpcUrl, setRpcUrl] = useState("https://www.google.ru/");
  const [webSocketUrl, setWebSocketUrl] = useState("https://www.naver.com/");
  const [blockExplorerUrl, setBlockExplorerUrl] = useState(
    "https://www.hello-world.com/"
  );

  const [step, setStep] = useState(1);

  const handleInitializeCluster = () => {
    console.log({ clusterId, maxSequencerNumber });
    setStep(2);
  };
  const handleAddRollup = () => {
    console.log({
      clusterId,
      rollupId,
      chainType,
      address,
      orderCommitmentType,
      validationInfo: { platform, serviceProvider },
    });
    setStep(3);
  };

  const handleAddServerData = () => {
    console.log({
      rpcUrl,
      webSocketUrl,
      blockExplorerUrl,
    });
    toggle();
  };

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
        {(step === 1 && (
          <>
            <InputContainer>
              <Label>Cluster ID</Label>
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
                <Label>Chain Type</Label>
                <SelectBox onChange={(e) => setChainType(e.target.value)}>
                  <option defaultValue="Ethereum">Ethereum</option>
                </SelectBox>
              </InputContainer>{" "}
              <InputContainer>
                <Label>Order Commitment Type</Label>
                <SelectBox
                  onChange={(e) => setOrderCommitmentType(e.target.value)}
                >
                  <option defaultValue="orderCommtiment">
                    Order Commitment
                  </option>
                  <option>Transaction Hash</option>
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
                    <option defaultValue="eigenlayer">Eigenlayer</option>
                    <option>Symbiotic</option>
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
          ))}
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
