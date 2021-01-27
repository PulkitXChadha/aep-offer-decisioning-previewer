import React from "react";
import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import {
  Content,
  ProgressCircle,
  IllustratedMessage,
  Heading,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import Error from "@spectrum-icons/illustrations/Error";

const PropositionHistoryView = (props) => {
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const experienceEvents = useActionWebInvoke({
    actionName: "get-profile-experience-events",
    headers: headers,
    params: {
      identityNamespace: props.identityNamespace,
      identityValue: props.identityValue,
      sandboxName: props.sandboxName,
    },
  });
  let content = (
    <ProgressCircle
      id="proposition-history-view-progress-circle"
      aria-label="Getting Proposition Events"
      isIndeterminate
      isHidden={!experienceEvents.isLoading}
      marginStart="size-100"
    />
  );

  if (!experienceEvents.isLoading && experienceEvents.error) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{experienceEvents.error.message}</Content>
      </IllustratedMessage>
    );
  }

  if (!experienceEvents.isLoading && experienceEvents.data) {
    experienceEvents.data.children
    content = (
      <ReactJson
        src={experienceEvents.data.children}
        name="propositionHistory"
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
      />
    );
  }

  return content;
};

PropositionHistoryView.propTypes = {
  offer: PropTypes.any,
};

export default PropositionHistoryView;
