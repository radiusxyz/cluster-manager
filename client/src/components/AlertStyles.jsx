import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ $error, $processing }) =>
    $error ? "#ffe6e6" : $processing ? "#fff5e6" : "#e6ffe6"};
  border: 1px solid
    ${({ $error, $processing }) =>
      $error ? "#ff5c5c" : $processing ? "#ffa500" : "#5cff5c"};
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${({ $error, $processing }) =>
    $error ? "#b30000" : $processing ? "#cc8400" : "#006600"};
  margin-bottom: 5px;
`;

export const Message = styled.p`
  font-size: 16px;
  color: ${({ $error, $processing }) =>
    $error ? "#800000" : $processing ? "#b35900" : "#004d00"};
`;
