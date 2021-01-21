import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Content,
  Image,
  ProgressCircle,
  IllustratedMessage,
  Heading,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import Error from "@spectrum-icons/illustrations/Error";

const OfferRender = (props) => {
  const displayParams = {
    containerID: props.containerID,
    placementID: props.placementID,
    activityID: props.activityID,
    identityNamespace: props.identityNamespace,
    entityValue: props.entityValue,
  };
  console.log(`from OfferRender ${JSON.stringify(displayParams)}`);
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const offer = useActionWebInvoke({
    actionName: "get-offer-representation",
    headers: headers,
    params: {
      containerID: props.containerID,
      placementID: props.placementID,
      activityID: props.activityID,
      identityNamespace: props.identityNamespace,
      entityValue: props.entityValue,
    },
  });
  let content = (
    <ProgressCircle
      id="offer-render-progress-circle"
      aria-label="Getting Offer Representation"
      isIndeterminate
      isHidden={!offer.isLoading}
      marginStart="size-100"
    />
  );

  if (!offer.isLoading && offer.error) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{offer.error.message}</Content>
      </IllustratedMessage>
    );
  }

  if (!offer.isLoading && offer.data && offer.data.status === 404) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{offer.data.detail}</Content>
      </IllustratedMessage>
    );
  }

  if (!offer.isLoading && offer.data && offer.data.status != 404) {
    const offerProposition = offer.data["xdm:propositions"][0];
    const offerData = offerProposition["xdm:options"]
      ? offerProposition["xdm:options"][0]
      : offerProposition["xdm:fallback"];

    if (
      offerData["dc:format"] == "image/png" ||
      offerData["dc:format"] == "image/jpeg"
    )
      content = (
        <Image src={offerData["xdm:deliveryURL"]} alt="Offer Content" />
      );
    if (offerData["dc:format"] == "text/plain")
      content = <Content>{offerData["xdm:content"]}</Content>;
  }

  return content;
};

OfferRender.propTypes = {
  offer: PropTypes.any,
};

export default OfferRender;
