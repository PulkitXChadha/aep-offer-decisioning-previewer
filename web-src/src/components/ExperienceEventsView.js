import React, { useState, useEffect } from "react";

import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import {
  Content,
  ProgressCircle,
  IllustratedMessage,
  Heading,
  Text,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import Error from "@spectrum-icons/illustrations/Error";

const ExperienceEventsView = (props) => {
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
      id="experienceEvents-view-progress-circle"
      aria-label="Getting Experience Events"
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

  if (
    !experienceEvents.data &&
    !experienceEvents.error &&
    !experienceEvents.isLoading
  ) {
    content = <Text>No Experience Events Found</Text>;
  }

  if (!experienceEvents.isLoading && experienceEvents.data) {
    content = (
      <ReactJson
        src={experienceEvents.data.children}
        name="events"
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
      />
    );
  }

  return content;
};

ExperienceEventsView.propTypes = {
  offer: PropTypes.any,
};

export default ExperienceEventsView;
