import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import ProfilePage from './ProfilePage';
import EcoPage from './EcoPage';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 102px);
  overflow-y: hidden;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  height: 70px;
  position: sticky;
  top: 0;
`;

const Tab = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  padding: 10px 0px 10px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  background: ${({ active }) =>
    active
      ? 'linear-gradient(90deg, #483D8B 1.8%, #4B0082 94.91%)' // Dark blue to violet for active
      : 'linear-gradient(180deg, rgba(72, 61, 139, 0.50) 0%, rgba(75, 0, 130, 0.00) 100%)'}; // Lighter gradient for inactive
`;

const Text = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px;
`;

const Project = () => {
  const [is0Active, setIs0Active] = useState(true);
  const handleTab = (event) => {
    event.preventDefault();
    event.target.textContent === 'Profile'
      ? setIs0Active(true)
      : setIs0Active(false);
  };

  return (
    <Container>
      <Tabs>
        <Tab active={is0Active ? true : undefined} onClick={handleTab}>
          <Text>Profile</Text>
        </Tab>
        <Tab active={!is0Active ? true : undefined} onClick={handleTab}>
          <Text>Ecosystem</Text>
        </Tab>
      </Tabs>
      {is0Active ? <ProfilePage /> : <EcoPage />}
    </Container>
  );
};

export default Project;
