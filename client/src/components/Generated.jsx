import React, { useEffect, useState } from "react";
import * as s from "./GeneratedCardsStyles";
import { useGET } from "../hooks/useServer";

const Generated = ({ address }) => {
  const [clustersGenerated, setClustersGenerated] = useState([]);
  const [shouldGetClustersGenerated, setShouldGetClustersGenerated] =
    useState(false);

  const {
    isPending: isPendingClustersGenerated,
    error: errorClustersGenerated,
    data: dataClustersGenerated,
    refetch: refetchClustersGenerated,
  } = useGET(
    ["clustersGenerated", address],
    `http://localhost:3333/api/v1/addresses/${address}/clusters/generated`,
    true,
    3000
  );

  useEffect(() => {
    if (dataClustersGenerated) {
      console.log("dataClusters: ", dataClustersGenerated);
      setClustersGenerated(dataClustersGenerated);
    }
  }, [dataClustersGenerated]);

  return (
    <s.CardsContainer>
      {!clustersGenerated ? (
        <Loading />
      ) : (
        clustersGenerated.map((cluster) => (
          <s.CardWrapperLink
            to={`/${cluster.clusterId}/details`}
            key={cluster.clusterId}
          >
            <s.Card>
              <s.NameIdEditWrapper>
                <s.NameIdWrapper>
                  <s.Name>Cluster ID: </s.Name>
                  <s.Id>{cluster.clusterId}</s.Id>
                </s.NameIdWrapper>
                {/* <s.EditBtn>Edit</s.EditBtn> */}
              </s.NameIdEditWrapper>
              <s.PropsWrapper>
                <s.PropWrapper>
                  <s.PropTitle>Quota:</s.PropTitle>
                  <s.PropValue>
                    {
                      cluster.sequencers.filter(
                        (sequencer) =>
                          sequencer !==
                          "0x0000000000000000000000000000000000000000"
                      ).length
                    }
                    /{cluster.sequencers.length}
                  </s.PropValue>
                </s.PropWrapper>
              </s.PropsWrapper>
            </s.Card>
          </s.CardWrapperLink>
        ))
      )}
    </s.CardsContainer>
  );
};

export default Generated;
