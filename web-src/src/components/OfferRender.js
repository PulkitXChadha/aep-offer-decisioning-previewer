import React, { useState } from "react";

import ReactJson from "react-json-view";
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
import IneligibleOffers from "./IneligibleOffers";

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
      dryRunFlag: props.dryRunFlag,
    },
    cacheResponse: false,
  });
  let offerMetaDataContent = (
    <ProgressCircle
      id="offer-render-progress-circle"
      aria-label="Getting Offer Representation"
      isIndeterminate
      isHidden={!offer.isLoading}
      marginStart="size-100"
    />
  );

  if (!offer.isLoading && offer.error) {
    offerMetaDataContent = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{offer.error.message}</Content>
      </IllustratedMessage>
    );
  }

  if (!offer.isLoading && offer.data && offer.data.status === 404) {
    offerMetaDataContent = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{offer.data.detail}</Content>
      </IllustratedMessage>
    );
  }
  let offerContent = null;
  let ineligibleOfferContent = null;
  if (!offer.isLoading && offer.data && offer.data.status != 404) {
    const offerProposition = offer.data["xdm:propositions"][0];
    const offerData = offerProposition["xdm:options"]
      ? { offerType: "proposition", ...offerProposition["xdm:options"][0] }
      : { offerType: "fallback", ...offerProposition["xdm:fallback"] };
    const offerID = offerData["xdm:id"];

    if (
      offerData["dc:format"] == "image/png" ||
      offerData["dc:format"] == "image/jpeg"
    )
      offerContent = (
        <Image src={offerData["xdm:deliveryURL"]} alt="Offer Content" />
      );

    if (offerData["dc:format"] == "text/plain")
      offerContent = <Content>{offerData["xdm:content"]}</Content>;

    if (offerData["dc:format"] == "application/json")
      offerContent = (
        <ReactJson
          src={JSON.parse(offerData["xdm:content"])}
          name="offerContent"
          displayObjectSize={false}
          displayDataTypes={false}
          quotesOnKeys={false}
        />
      );

    if (offerData["dc:format"] == "text/html")
      offerContent = <Well>{offerData["xdm:deliveryURL"]}</Well>;
    if (offerData.offerType === "proposition") {
      offerMetaDataContent = (
        <OfferDetails
          ims={props.ims}
          containerID={props.containerID}
          offerID={offerID}
        />
      );
    }
    if (offerData.offerType === "fallback") {
      offerMetaDataContent = (
        <FallbackOfferDetails
          ims={props.ims}
          containerID={props.containerID}
          offerID={offerID}
        />
      );
    }
    ineligibleOfferContent = (
      <IneligibleOffers
        ims={props.ims}
        containerID={props.containerID}
        offerID={offerID}
        collections={props.collections}
        placementID={props.placementID}
        offerType={offerData.offerType}
      />
    );
  }

  return (
    <View>
      <Well>
        <h3>Offer Content</h3>
        {offerContent}
        {offerMetaDataContent}
      </Well>
      <Well>
        <h3>Ineligible Offers</h3>
        {ineligibleOfferContent}
      </Well>
    </View>
  );
};

OfferRender.propTypes = {
  offer: PropTypes.any,
};

export default OfferRender;
