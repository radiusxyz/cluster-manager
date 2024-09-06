import { useState } from "react";
import styled from "styled-components";

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
  background-color: ${(props) => (props.active ? "#000" : "#ccc")};
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

const Label = styled.p``;

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

const Modal = ({ toggle }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [chainId, setChainId] = useState("");
  const [type, setType] = useState("");
  const [step, setStep] = useState(1);

  const handleGenerate = () => {
    console.log({ name, symbol, chainId, type });
    setStep(2);
  };
  const handleSubmit = () => {
    console.log({ name, symbol, chainId, type });
    toggle();
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>Generate Interactive Canvas</Title>
        <StepsContainer>
          <Step active={step === 1}></Step>
          <Step active={step === 2}></Step>
        </StepsContainer>
        {step === 1 ? (
          <>
            {" "}
            <InputContainer>
              <Label>Name</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Symbol</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setSymbol(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Chain Id</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setChainId(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Type</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </InputContainer>{" "}
          </>
        ) : (
          <>
            <InputContainer>
              <Label>RPC URL</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Web-Socket URL</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setSymbol(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <Label>Block Explorer URL</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setChainId(e.target.value);
                }}
              />
            </InputContainer>
          </>
        )}
        <Buttons>
          <SubmitBtnContainer>
            <button onClick={handleGenerate} disabled={step === 2}>
              Generate on chain
            </button>
          </SubmitBtnContainer>
          <SubmitBtnContainer>
            <button onClick={handleSubmit} disabled={step === 1}>
              Store URL data on the server
            </button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
