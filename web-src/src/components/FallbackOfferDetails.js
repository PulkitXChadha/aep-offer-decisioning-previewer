import React from "react";
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

const FallbackOfferDetails = (props) => {
  const setProfileAttributes = useProfileDispatch();
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const offerDetails = useActionWebInvoke({
    actionName: "get-fallback-offer-details",
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

  if (
    !offerDetails.isLoading &&
    offerDetails.data &&
    offerDetails.data.status != 404
  ) {
    const detailedResult = offerDetails.data._embedded.results[0];

    const offerName = detailedResult._instance["xdm:name"];

    content = (
      <View>
        <Well role="offerDetails">
          <h3>Offer Details</h3>
          <p>
            <strong>Name: </strong>
            {offerName}
          </p>
        </Well>
      </View>
    );
  }
  setProfileAttributes([]);
  return content;
};

FallbackOfferDetails.propTypes = {
  offer: PropTypes.any,
};

export default FallbackOfferDetails;
