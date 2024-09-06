import styled from "styled-components";

export const StyledButton = styled.button`
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

const Button = ({ children, onClick, disabled }) => (
  <StyledButton onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

export default Button;
