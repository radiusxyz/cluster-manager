import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.div`
  width: 100%;
  display: flex;
  height: 102px;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 0 60px;
`;

const Sub = styled.div`
  display: flex;
  align-items: center;
  gap: 63px;
`;

const Text = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px; /* 90.625% */
`;

const A = styled(Link)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: orange;
  }
`;

const Address = styled.p`
  color: green;
  font-size: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  // max-width: 250px;
  display: flex;
`;

const NavBar = ({ account }) => {
  return (
    <Main>
      <Text>EcoSync</Text>
      <Sub>
        <Text>
          <A to={`/project/${account}`}>MY COMPANY</A>
        </Text>
        <Text>
          <A to='/global'>GLOBAL</A>
        </Text>
        {account ? (
          <Address>
            {account.slice(0, 5)}...{account.slice(-5)}
          </Address>
        ) : (
          <></>
        )}
      </Sub>
    </Main>
  );
};

export default NavBar;
