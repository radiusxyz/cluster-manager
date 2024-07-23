import styled from "styled-components";

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #d6ebf2;
  backdrop-filter: blur(4px);
`;

export const Head = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #d6ebf2;
`;

export const HeadTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const HeadTopLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const FilterBtn = styled.button`
  border: none;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background: var(--White, #fff);
  box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
    0px 0px 0px 1px rgba(70, 79, 96, 0.16), 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    background: lightblue;
  }
`;
export const Search = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 6px;
  background: var(--White, #fff);
  box-shadow: 0px 0px 0px 1px rgba(104, 113, 130, 0.16),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  padding: 6px 12px;
  max-width: 320px;
  width: 100%;
`;

export const SearchInput = styled.input`
  border: none;
  color: #5a9bb0;
  &:focus {
    outline: none;
  }
`;

export const HeadTopRight = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Logo = styled.img`
  width: 32px;
`;
export const Text = styled.span`
  font-family: Russo One;
  font-size: 22px;
  color: #5a9bb0;
`;

export const HeadBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #d6ebf2;
  position: sticky;
  z-index: 1000;
  padding: 20px;
  bottom: 0;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 5px;
`;

export const Element = styled.button`
  padding: 6px 11px;
  display: flex;
  color: #5a9bb0;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid lightgray;
  cursor: pointer;
`;

export const LeftArr = styled.div`
  transform: rotate(90deg);
  color: #5a9bb0;
`;

export const RightArr = styled.div`
  transform: rotate(-90deg);
  color: #5a9bb0;
`;

export const GenerateCluster = styled.button`
  background-color: #0078d0;
  border: 0;
  border-radius: 56px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu,
    "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 600;
  outline: 0;
  padding: 16px 21px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:before {
    background-color: initial;
    background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
    border-radius: 125px;
    content: "";
    height: 50%;
    left: 4%;
    opacity: 0.5;
    position: absolute;
    top: 0;
    transition: all 0.3s;
    width: 92%;
  }

  &:hover {
    box-shadow: rgba(255, 255, 255, 0.2) 0 3px 15px inset,
      rgba(0, 0, 0, 0.1) 0 3px 5px, rgba(0, 0, 0, 0.1) 0 10px 13px;
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    padding: 16px 48px;
  }
`;

export const ConnetWallet = styled.button`
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
    rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
    rgba(44, 187, 99, 0.15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
      rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
      rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
      rgba(44, 187, 99, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }
`;
