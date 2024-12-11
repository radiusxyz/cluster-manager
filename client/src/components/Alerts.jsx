import React from "react";
import {
  IconArea,
  CloseArea,
  CopyArea,
  SuccessBox,
  FailBox,
} from "./AlertsStyles";

const Alerts = () => {
  return (
    <div>
      <FailBox>
        <IconArea type="warning">
          <i className="material-icons">warning</i>
        </IconArea>
        <CloseArea>
          <i className="material-icons">cancel</i>
        </CloseArea>
        <CopyArea>
          <strong>Error in calling contract function</strong> Alert text.
        </CopyArea>
      </FailBox>

      <SuccessBox>
        <IconArea type="newsletter">
          <i className="material-icons">email</i>
        </IconArea>
        <CloseArea>
          <i className="material-icons">cancel</i>
        </CloseArea>
        <CopyArea>
          <strong>Success in calling contract function</strong>
        </CopyArea>
      </SuccessBox>
    </div>
  );
};

export default Alerts;
