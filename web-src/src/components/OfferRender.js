import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Content,
  Image,
  ProgressCircle,
  IllustratedMessage,
  Heading,
  View,
  Well,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import Error from "@spectrum-icons/illustrations/Error";

import OfferDetails from "./OfferDetails";
import FallbackOfferDetails from "./FallbackOfferDetails";

const OfferRender = (props) => {
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

    //get proposition or Fallback response
    const offerData = offerProposition["xdm:options"]
      ? { offerType: "proposition", ...offerProposition["xdm:options"][0] }
      : { offerType: "fallback", ...offerProposition["xdm:fallback"] };
    const offerID = offerData["xdm:id"];

    let offerContent = null;
    if (
      offerData["dc:format"] == "image/png" ||
      offerData["dc:format"] == "image/jpeg"
    )
      offerContent = (
        <Image src={offerData["xdm:deliveryURL"]} alt="Offer Content" />
      );

    if (offerData["dc:format"] == "text/plain")
      offerContent = <Content>{offerData["xdm:content"]}</Content>;

    if (offerData.offerType === "proposition") {
      content = (
        <View>
          <OfferDetails
            ims={props.ims}
            containerID={props.containerID}
            offerID={offerID}
          />
          <Well>
            <h3>Offer Content</h3>
            {offerContent}
          </Well>
        </View>
      );
    }
    if (offerData.offerType === "fallback") {
      content = (
        <View>
          <FallbackOfferDetails
            ims={props.ims}
            containerID={props.containerID}
            offerID={offerID}
          />
          <Well>
            <h3>Offer Content</h3>
            {offerContent}
          </Well>
        </View>
      );
    }
  }

  return content;
};

OfferRender.propTypes = {
  offer: PropTypes.any,
};

export default OfferRender;
