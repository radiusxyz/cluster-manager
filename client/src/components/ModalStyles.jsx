import styled from "styled-components";

export const Overlay = styled.div`
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

export const ModalContainer = styled.div`
  width: 100%;
  z-index: 2;
  max-width: 500px;
  border-radius: 10px;
  min-height: 25%;
  gap: 10px;
  padding: 30px;
  background-color: #fff;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StepsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Step = styled.div`
  border-radius: 50%;
  width: 20px;
  aspect-ratio: 1;
  background-color: ${(props) => (props.$active ? "#000" : "#ccc")};
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Label = styled.p`
  font-weight: 600;
`;

export const SubLabel = styled(Label)`
  font-size: 14px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-self: flex-end;
  margin-top: auto;
`;

export const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Input = styled.input`
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

export const Files = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const DownloadBinBtn = styled.a`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: black;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
    background: grey;
    color: white;
  }

  &:disabled {
    background: lightgray;
    color: darkgray;
    cursor: not-allowed; /* Change the cursor to indicate it's disabled */
  }
`;
