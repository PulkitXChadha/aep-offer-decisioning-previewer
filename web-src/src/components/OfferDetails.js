import React from "react";
import PropTypes from "prop-types";
import {
  Content,
  View,
  ProgressCircle,
  IllustratedMessage,
  Heading,
  Well,
  Grid,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import EligibilityRuleDetails from "./EligibilityRuleDetails";
import OfferPropositionMetricView from "./OfferPropositionMetricView";

import Error from "@spectrum-icons/illustrations/Error";

const OfferDetails = (props) => {
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const offerDetails = useActionWebInvoke({
    actionName: "get-offer-details",
    headers: headers,
    params: {
      containerID: props.containerID,
      offerID: props.offerID,
    },
  });

  let content = (
    <ProgressCircle
      id="offer-details-progress-circle"
      aria-label="Getting Offer Details"
      isIndeterminate
      isHidden={!offerDetails.isLoading}
      marginStart="size-100"
    />
  );

  if (!offerDetails.isLoading && offerDetails.error) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{offerDetails.error.message}</Content>
      </IllustratedMessage>
    );
  }

  if (
    !offerDetails.isLoading &&
    offerDetails.data &&
    offerDetails.data.status === 404
  ) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{offerDetails.data.detail}</Content>
      </IllustratedMessage>
    );
  }

  if (!offerDetails.data && !offerDetails.error && !offerDetails.isLoading) {
    content = (
      <View>
        <Well role="offerDetails">
          <h3>Offer Details</h3>
          <p>No details available.</p>
        </Well>
      </View>
    );
  }
  
  if (!offerDetails.isLoading && offerDetails.data) {
    const detailedResult = offerDetails.data._embedded.results[0];
    const offerName = detailedResult._instance["xdm:name"];
    const offerRank = detailedResult._instance["xdm:rank"]["xdm:priority"];
    const offerGlobalCap =
      detailedResult._instance["xdm:cappingConstraint"]["xdm:globalCap"];
    const offerStartDate =
      detailedResult._instance["xdm:selectionConstraint"]["xdm:startDate"];
    const offerEndDate =
      detailedResult._instance["xdm:selectionConstraint"]["xdm:endDate"];
    const ruleID =
      detailedResult._instance["xdm:selectionConstraint"][
        "xdm:eligibilityRule"
      ];

    content = (
      <View gridArea="offerDetails">
        <Well role="offerDetails">
          <h3>Offer Details</h3>
          <p>
            <strong>Name: </strong>
            {offerName}
            <br /> <strong>Rank: </strong>
            {offerRank}
            <br /> <strong>Global Cap: </strong>
            {offerGlobalCap}
            <br /> <br />
            {offerGlobalCap && (
              <OfferPropositionMetricView
                ims={props.ims}
                offerGlobalCap={offerGlobalCap}
                containerID={props.containerID}
                offerID={props.offerID}
              />
            )}
            <br /> <strong>Start Date: </strong>
            {new Date(offerStartDate).toUTCString()}
            <br /> <strong>End Date: </strong>
            {new Date(offerEndDate).toUTCString()}
          </p>
        </Well>
        <EligibilityRuleDetails
          ims={props.ims}
          containerID={props.containerID}
          ruleID={ruleID}
        />
      </View>
    );
  }

  return content;
};

OfferDetails.propTypes = {
  offer: PropTypes.any,
};

export default OfferDetails;
