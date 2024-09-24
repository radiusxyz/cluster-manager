import Button from "./Button";
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

import React from "react";

const RunModal = ({ toggle, cluster }) => {
  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>Run a sequencer</Title>
        <div>{cluster?.configs}</div>
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={() => {}}>Download All</Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default RunModal;