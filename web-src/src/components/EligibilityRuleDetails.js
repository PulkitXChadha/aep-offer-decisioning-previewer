import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Content,
  View,
  ProgressCircle,
  IllustratedMessage,
  Heading,
  Well,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";
import {
  ProfileProvider,
  useProfileState,
  useProfileDispatch,
} from "../context/ProfileViewContext.js";
import Error from "@spectrum-icons/illustrations/Error";

const EligibilityRuleDetails = (props) => {
  const setProfileAttributes = useProfileDispatch();

  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const ruleDetails = useActionWebInvoke({
    actionName: "get-decision-rules",
    headers: headers,
    params: {
      containerID: props.containerID,
      ruleID: props.ruleID,
    },
  });

  let content = (
    <ProgressCircle
      id="offer-details-progress-circle"
      aria-label="Getting Offer Details"
      isIndeterminate
      isHidden={!ruleDetails.isLoading}
      marginStart="size-100"
    />
  );

  if (!ruleDetails.isLoading && ruleDetails.error) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{ruleDetails.error.message}</Content>
      </IllustratedMessage>
    );
  }
  if (!ruleDetails.data && !ruleDetails.error && !ruleDetails.isLoading) {
    content = (
      <View>
        <Well role="ruleDetails">
          <h3>Decision Rule Details</h3>
          <p>
            <strong>No Details found.</strong>
          </p>
        </Well>
      </View>
    );
  }
  if (!ruleDetails.isLoading && ruleDetails.data) {
    const detailedResult = ruleDetails.data._embedded.results[0];
    const ruleName = detailedResult._instance["xdm:name"];

    const ruleConditionValue =
      detailedResult._instance["xdm:condition"]["xdm:value"];

    content = (
      <View>
        <Well role="ruleDetails">
          <h3>Decision Rule Details</h3>
          <p>
            <strong>Name: </strong>
            {ruleName}
            <br /> <strong>Condition: </strong>
            {ruleConditionValue}
          </p>
        </Well>
      </View>
    );

    setProfileAttributes(ruleConditionValue );
  }

  return content;
};

EligibilityRuleDetails.propTypes = {
  offer: PropTypes.any,
};

export default EligibilityRuleDetails;
