import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Content,
  View,
  ProgressCircle,
  IllustratedMessage,
  Heading,
  Well,
  Text,
  Flex,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";
import Alert from "@spectrum-icons/workflow/Alert";
import EligibilityRuleDetails from "./EligibilityRuleDetails";
import OfferPropositionMetricView from "./OfferPropositionMetricView";

import Error from "@spectrum-icons/illustrations/Error";

const OfferDetails = (props) => {
  const [usageMetric, setUsageMetric] = useState();

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
    cacheResponse: false,
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
    const offerStatus = detailedResult._instance["xdm:status"];
    const offerRank = detailedResult._instance["xdm:rank"]["xdm:priority"];
    const offerGlobalCap =
      detailedResult._instance["xdm:cappingConstraint"]["xdm:globalCap"];
    const offerStartDate = new Date(
      detailedResult._instance["xdm:selectionConstraint"]["xdm:startDate"]
    );
    const offerEndDate = new Date(
      detailedResult._instance["xdm:selectionConstraint"]["xdm:endDate"]
    );
    const ruleID =
      detailedResult._instance["xdm:selectionConstraint"][
        "xdm:eligibilityRule"
      ];

    const placements = detailedResult._instance["xdm:representations"].map(
      (reps) => reps["xdm:placement"]
    );
    if (props.onLoad) {
      props.onLoad(offerRank);
    }

    let ineligibilityReason = null;
    let ineligibilityMessage = null;
    if (props.ineligibleOffer) {
      let color = "negative";
      ineligibilityReason = "Profile Does not qualify for decision rule.";
      // check if offer is approved in offer
      if (offerStatus != "approved") {
        ineligibilityReason = "Offer has not been approved.";
        color = "notice";
      } else {
        // check if placement in offer
        if (placements.indexOf(props.placementID) === -1) {
          ineligibilityReason = "Placement not Found on offer.";
          color = "notice";
        } else {
          // offer no longer eligible
          const now = new Date();
          if (
            parseInt(now.getTime()) <= parseInt(offerStartDate.getTime()) ||
            parseInt(now.getTime()) >= parseInt(offerEndDate.getTime())
          ) {
            ineligibilityReason = "Offer eligibility period is not valid.";
            color = "negative";
          } else {
            // conditional (THIS IS set by default so skipped here)
            // has the cap been reached?
            if (usageMetric >= offerGlobalCap) {
              ineligibilityReason = "Offer Usage Cap has reached.";
            } else {
              // Rank
              if (offerRank < props.winningOfferRank) {
                ineligibilityReason = "Offer Ranked lower.";
                color = "negative";
              }
            }
          }
        }
      }

      ineligibilityMessage = (
        <p>
          <strong>Ineligibility Reason: </strong>
          <Flex gap="size-100">
            <Alert aria-label="Negative Alert" color={color} />
            {ineligibilityReason}
          </Flex>
        </p>
      );
    }
    content = (
      <View gridArea="offerDetails">
        <Well role="offerDetails">
          {ineligibilityMessage}
          <h3>Offer Details</h3>
          <p>
            <strong>Name: </strong>
            {offerName}
            <br /> <strong>Rank: </strong>
            {offerRank}
            <br /> <strong>Global Cap: </strong>
            {offerGlobalCap}
            <br />
          </p>
          {offerGlobalCap && (
            <OfferPropositionMetricView
              ims={props.ims}
              offerGlobalCap={offerGlobalCap}
              containerID={props.containerID}
              offerID={props.offerID}
              onLoad={(count) => setUsageMetric(count)}
            />
          )}
          <br /> <strong>Start Date: </strong>
          {offerStartDate.toUTCString()}
          <br /> <strong>End Date: </strong>
          {offerEndDate.toUTCString()}
          <EligibilityRuleDetails
            ims={props.ims}
            containerID={props.containerID}
            ruleID={ruleID}
            ineligibleOffer={props.ineligibleOffer}
          />
        </Well>
      </View>
    );
  }

  return content;
};

OfferDetails.propTypes = {
  offer: PropTypes.any,
};

export default OfferDetails;
