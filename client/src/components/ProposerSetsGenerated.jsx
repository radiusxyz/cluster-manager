import React, { useContext, useState } from "react";
import { PSMContext } from "../contexts/PSMContext";

const ProposerSetsGenerated = () => {
  const { pollingInterval, shorten } = useContext(PSMContext);

  const [proposerSetsGenerated, setProposerSetsGenerated] = useState([]);
  const [shouldGetProposerSetsGenerated, setShouldGetProposerSetsGenerated] =
    useState(false);

  const [queryAddress, setQueryAddress] = useState(address);

  const {
    isPending: isPendingProposerSetsGenerated,
    error: errorProposerSetsGenerated,
    data: dataProposerSetsGenerated,
    refetch: refetchProposerSetsGenerated,
  } = useGET(
    ["proposerSetsGenerated", queryAddress],
    `http://localhost:3333/api/v1/addresses/${queryAddress}/proposer-sets/generated`,
    shouldGetProposerSetsGenerated,
    pollingInterval
  );

  useEffect(() => {
    if (dataProposerSetsGenerated) {
      console.log("dataProposerSets: ", dataProposerSetsGenerated);
      setProposerSetId(dataProposerSetsGenerated[0].proposerSetId);
      setProposerSetsGenerated(dataProposerSetsGenerated);
    }
  }, [dataProposerSets]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "20px",
        background: "aquamarine",
        gap: 100,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{"Generated Proposer Sets"}</p>
      <div>
        {proposerSetsGenerated?.map((item) => (
          <p
            key={item?.proposerSetId}
            style={{
              padding: "5px 15px",
              background: "paleturquoise",
              marginBottom: "5px",
            }}
          >
            {shorten(item?.proposerSetId)}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchProposerSetsGenerated}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/generated
        </button>
      </div>
    </div>
  );
};

export default ProposerSetsGenerated;
