import React, { useEffect, useState } from "react";
import styled from "styled-components";
import radius from "../assets/images/radius.png";
import { Button } from "./RootLayout";
import { useAccount } from "../contexts/AccountContext";
import CircleImageUploader from "../components/CircleImageUploader";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { uploadFile } from "../utils";
import { useLocation, useParams } from "react-router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const Content = styled.div`
  padding-top: 64px;
  padding-bottom: 32px;
  display: flex;
  gap: 70px;
  width: 100%;
  justify-content: center;
`;
const Logo = styled.div`
  gap: 10px;
  flex-direction: column;
  display: flex;
`;

const AddLogo = styled.input`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: blue;
  display: flex;
  align-items: center;
`;

const FieldsAndButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 500px;
  width: 100%;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
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
  min-width: 520px;
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

const TextArea = styled.textarea`
  display: flex;
  min-width: 520px;
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

const USERS_QUERY = (address) => gql`
  {
    company(id: "${address}") { id name walletAddress profilePhoto tokenName description }
  }
`;

const ProfilePage = () => {
  const { pathname } = useLocation();

  const { address } = useParams();
  const { account, contractAddress, contractABI } = useAccount();
  const { loading, error, data } = useQuery(USERS_QUERY(address));

  const [logo, setLogo] = useState(null);
  const [name, setName] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [token, setToken] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data?.company) {
      console.log(
        `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
          data?.company.profilePhoto
        }`
      );
      setLogo({
        src: `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
          data?.company.profilePhoto
        }`,
      });
    }
  }, [data]);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleToken = (e) => {
    setToken(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  useEffect(() => {
    token && !hasToken && setHasToken(true);
  }, [hasToken, token]);

  const handleSave = async () => {
    if (address !== account) {
      return;
    }

    const provider = new Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // upload company logo file
    if (!logo) {
      alert("Please upload a logo");
      return;
    }

    const response = await uploadFile(
      `${account}.${/** @type {File} */ (logo.file).name.split(".").at(-1)}`,
      logo.file
    );
    // console.log('response', response);

    // const logoUrl = `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
    //   response.IpfsHash
    // }`;

    console.log(name, response.IpfsHash, token, description);
    const tx = await contract.addCompany(
      name,
      response.IpfsHash,
      token,
      description
    );
  };

  return (
    <Content>
      {loading && <Loader />}
      <Logo>
        <Label>Logo</Label>
        <CircleImageUploader
          image={logo}
          setImage={setLogo}
          disabled={!data || (!!data?.company && !!logo?.src && !logo?.file)}
        />
      </Logo>
      <FieldsAndButton>
        <Fields>
          <Field>
            <Label>Address</Label>
            <Input value={address} readOnly />
          </Field>
          <Field>
            <Label>Name</Label>
            <Input
              placeholder="Enter your project title"
              defaultValue={data?.company?.name}
              onChange={handleName}
              readOnly={loading || !!data?.company}
            />
          </Field>
          <Field>
            <Label>Token</Label>
            <Input
              placeholder="What token do you issue?"
              defaultValue={data?.company?.tokenName}
              onChange={handleToken}
              readOnly={loading || !!data?.company}
            />
          </Field>
          <Field>
            <Label>Description</Label>
            <TextArea
              placeholder="What is your project about?"
              defaultValue={data?.company?.description}
              onChange={handleDescription}
              readOnly={loading || !!data?.company}
            />
          </Field>
        </Fields>
        {account === address && !data?.company && (
          <Button disabled={!account || loading} onClick={handleSave}>
            Save
          </Button>
        )}
      </FieldsAndButton>
    </Content>
  );
};

export default ProfilePage;
