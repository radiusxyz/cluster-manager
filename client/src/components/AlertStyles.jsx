import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px; /* Control width */
  padding: 15px;
  margin: 20px auto; /* Center horizontally */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ error }) => (error ? "#ffe6e6" : "#e6ffe6")};
  border: 1px solid ${({ error }) => (error ? "#ff5c5c" : "#5cff5c")};
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${({ error }) => (error ? "#b30000" : "#006600")};
  margin-bottom: 5px;
`;

export const Message = styled.p`
  font-size: 16px;
  color: ${({ error }) => (error ? "#800000" : "#004d00")};
`;
