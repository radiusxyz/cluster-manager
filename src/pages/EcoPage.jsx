import { useEffect, useState } from "react";
import styled from "styled-components";
import add from "../assets/images/add.svg";
import del from "../assets/images/delete.svg";
import { useAccount } from "../contexts/AccountContext";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useLocation, useParams } from "react-router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Label = styled.span`
  color: #909090;
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const Input = styled.input`
  display: flex;
  max-width: 579px;
  width: 100%;
  padding: 9px 14px;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #fff;
  background: rgba(255, 255, 255, 0);
  box-shadow: 8px 8px 8px 0px rgba(255, 199, 67, 0.7);
  color: ${({ disabled }) => (disabled ? "#909090" : "#fff")};
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const EcoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 100%;
  padding: 0 40px;
`;

const FieldAndButton = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
  width: 100%;
  justify-content: center;
  margin-top: 40px;
`;

const Add = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(1.09);
  }
`;

const Cols = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColHead = styled.p`
  color: #fff;
  text-align: center;
  font-family: Dosis;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ColBody = styled.ul`
  min-width: 550px;
  display: flex;
  background: rgba(0, 173, 209, 0.2);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 20px;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
  border-radius: 8px;
  min-height: 256px;
`;
const Project = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProjectLogo = styled.img`
  border-radius: 50%;
  width: 65px;
  height: 65px;
  object-fit: cover;
  object-position: center;
  overflow: clip;
`;
const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ProjectName = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ProjectAddress = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Del = styled.img`
  margin-left: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const ECOS_QUERY = (address) => gql`
  {
    ecos(where: { and: [{ isIncluded: true }, { or: [{ company1Address: "${address}" }, { company2Address: "${address}" }] }] }) {
      id
      company1Address
      company2Address
      isIncluded
    }
  }
`;

const COMPANIES_QUERY = (addresses) => gql`
  {
    companies(where: { id_in: ${JSON.stringify(
      addresses
    )} }) { id name walletAddress profilePhoto tokenName description }
  }
`;

const EcoPage = () => {
  const { address } = useParams();
  const { account, contractAddress, contractABI } = useAccount();
  const [addedToEco, setAddedToEco] = useState("");

  const ecosQuery = useQuery(ECOS_QUERY(address), {
    pollInterval: 10000,
  });
  const companiesQuery = useQuery(
    COMPANIES_QUERY(
      ecosQuery.data?.ecos.flatMap((eco) => [
        eco.company1Address,
        eco.company2Address,
      ])
    ),
    {
      pollInterval: 50000,
    }
  );

  useEffect(() => {
    console.log("ecosQuery", ecosQuery.data, ecosQuery.error, address);
  }, [ecosQuery.data, ecosQuery.error, address]);
  useEffect(() => {
    console.log("companiesQuery", companiesQuery.data);
  }, [companiesQuery.data]);

  const handleAddToEcoInput = (e) => {
    setAddedToEco(e.target.value);
  };

  const delFromEco = async (address) => {
    const provider = new Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.updateEcosystem(address, false);
    await ecosQuery.refetch();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await ecosQuery.refetch();
  };

  const addToEco = async () => {
    const provider = new Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("addedToEco", addedToEco);
    const tx = await contract.updateEcosystem(addedToEco, true);
    await ecosQuery.refetch();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await ecosQuery.refetch();
  };

  return (
    <EcoContent>
      {ecosQuery.loading ? <Loader /> : <></>}
      <FieldAndButton>
        <Field>
          <Label>Add the project address to ecosystem</Label>
          <Input onChange={handleAddToEcoInput} />
        </Field>
        <Add src={add} onClick={addToEco} />
      </FieldAndButton>
      <Cols>
        <Col>
          <ColHead>Includes:</ColHead>
          <ColBody>
            {ecosQuery.data?.ecos
              .filter((e) => e.company1Address === address)
              ?.map(({ company2Address }) => {
                const project = companiesQuery.data?.companies.find(
                  ({ walletAddress }) => walletAddress === company2Address
                );
                return (
                  <Project key={company2Address}>
                    <ProjectLogo
                      src={
                        project?.profilePhoto
                          ? `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
                              project.profilePhoto
                            }`
                          : undefined
                      }
                    />
                    <ProjectDetails>
                      <ProjectName>{project?.name ?? "???"}</ProjectName>
                      <ProjectAddress>{company2Address}</ProjectAddress>
                    </ProjectDetails>
                    {address === account && (
                      <Del
                        src={del}
                        width="46px"
                        onClick={() => delFromEco(company2Address)}
                      />
                    )}
                  </Project>
                );
              })}
          </ColBody>
        </Col>
        <Col>
          <ColHead>Is included in:</ColHead>
          <ColBody>
            {ecosQuery.data?.ecos
              .filter((e) => e.company2Address === address)
              ?.map(({ company1Address }) => {
                const project = companiesQuery.data?.companies.find(
                  ({ walletAddress }) => walletAddress === company1Address
                );
                return (
                  <Project key={company1Address}>
                    <ProjectLogo
                      width="65px"
                      src={
                        project?.profilePhoto
                          ? `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
                              project.profilePhoto
                            }`
                          : undefined
                      }
                    />
                    <ProjectDetails>
                      <ProjectName>{project?.name ?? "???"}</ProjectName>
                      <ProjectAddress>{company1Address}</ProjectAddress>
                    </ProjectDetails>
                  </Project>
                );
              })}
          </ColBody>
        </Col>
      </Cols>
    </EcoContent>
  );
};

export default EcoPage;
