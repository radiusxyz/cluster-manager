import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const IconArea = styled.div`
  margin-right: 15px;
  font-size: 36px;
  color: ${(props) => (props.type === "warning" ? "#ff9800" : "#2196f3")};
`;

export const CloseArea = styled.div`
  margin-left: auto;
  cursor: pointer;
  font-size: 24px;
  color: #555;
`;

export const CopyArea = styled.div`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

export const FailBox = styled(Box)`
  background-color: #fff8e1;
`;

export const SuccessBox = styled(Box)`
  background-color: #e3f2fd;
`;
