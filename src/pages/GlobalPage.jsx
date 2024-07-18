import styled from 'styled-components';
import cuid from 'cuid';
import { useNavigate } from 'react-router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../components/Loader';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  overflow: scroll;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    filter: invert(100%);
  }
  &:hover img {
    filter: invert(100%);
  }
  &:first-child {
    filter: invert(0%);
  }
  &:nth-child(odd) {
    background: #020538;
  }
  &:nth-child(even) {
    background-color: #050b69;
  }
`;

const ColHead = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 39px;
  font-style: normal;
  font-weight: 700;
  padding: 20px;
  width: 400px;
  display: flex;
  justify-content: center;
  background: black;
`;

const ColCell = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  padding: 20px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const COMPANIES_QUERY = gql`
  {
    companies {
      id
      name
      walletAddress
      profilePhoto
      includeCount
      includedByCount
    }
  }
`;

const GlobalPage = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(COMPANIES_QUERY);

  console.log('data', data);

  return (
    <Container>
      {loading && <Loader />}

      <Row>
        <ColHead>PROJECT</ColHead>
        <ColHead>LOGO</ColHead>
        <ColHead>INCLUDES</ColHead>
        <ColHead>INCLUDED IN</ColHead>
      </Row>
      {data?.companies?.map((project) => (
        <Row
          onClick={() => navigate(`/project/${project.id}`)}
          key={project.id}
        >
          <ColCell>{project.name}</ColCell>
          <ColCell>
            <img
              src={
                project.profilePhoto
                  ? `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
                      project.profilePhoto
                    }`
                  : undefined
              }
              style={{
                width: '65px',
                height: '65px',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
              }}
            />
          </ColCell>
          <ColCell>{project.includeCount}</ColCell>
          <ColCell>{project.includedByCount}</ColCell>
        </Row>
      ))}
    </Container>
  );
};

export default GlobalPage;
