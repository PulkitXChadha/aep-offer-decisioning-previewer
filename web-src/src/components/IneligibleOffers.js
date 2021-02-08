import React from "react";
import PropTypes from "prop-types";
import { View, ProgressCircle, Text } from "@adobe/react-spectrum";
import { Content } from "@react-spectrum/view";
import { Tabs, Item } from "@react-spectrum/tabs";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import OfferDetails from "./OfferDetails";
const IneligibleOffers = (props) => {
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const allOffers = useActionWebInvoke({
    actionName: "get-all-offers",
    headers: headers,
    params: {
      containerID: props.containerID,
    },
  });

  const allCollections = useActionWebInvoke({
    actionName: "get-all-collections",
    headers: headers,
    params: {
      containerID: props.containerID,
    },
  });

  let content = (
    <ProgressCircle
      id="ineligible-offers-progress-circle"
      aria-label="Getting Ineligible Offer Details"
      isIndeterminate
      isHidden={!allOffers.isLoading || !allCollections.isLoading}
      marginStart="size-100"
    />
  );
  if (!allOffers.isLoading && !allCollections.isLoading) {
    if (allOffers.error) {
      content = <Text>Could not get offers</Text>;
    }
    if (allCollections.error) {
      content = <Text>Could not get collection details</Text>;
    }

    if (allCollections.data && allOffers.data) {
      const tags = [];

      allCollections.data._embedded.results
        .filter(
          (collection) =>
            props.collections.indexOf(collection["_instance"]["@id"]) != -1
        )
        .map((collection) => {
          collection["_instance"]["xdm:ids"].map((tag) => tags.push(tag));
        });

      const offers = allOffers.data._embedded.results
        .filter((offer) => {
          return offer["_instance"]["xdm:tags"].filter(
            (offerTag) => tags.indexOf(offerTag) != -1
          ).length;
        })
        .filter((offer) => offer._instance["@id"] != props.offerID);

      let winningOfferRank;

      if (props.offerType === "fallback") {
        winningOfferRank = 0;
      }
      if (props.offerType === "proposition") {
        winningOfferRank = allOffers.data._embedded.results.filter(
          (offer) => offer._instance["@id"] === props.offerID
        )[0]._instance["xdm:rank"]["xdm:priority"];
      }

      content = (
        <View gridArea="ineligibleOffers">
          <Tabs
            // isQuiet
            density="compact"
            aria-label="Ineligible Offers"
            // orientation="vertical"
            items={offers}
            maxWidth="100%"
          >
            {(item) => (
              <Item
                title={item._instance["xdm:name"]}
                key={item._instance["@id"]}
              >
                <Content
                  marginTop="size-250"
                  marginStart="size-125"
                  key={item._instance["@id"]}
                  id={item._instance["@id"]}
                >
                  <OfferDetails
                    ims={props.ims}
                    containerID={props.containerID}
                    offerID={item._instance["@id"]}
                    ineligibleOffer={true}
                    placementID={props.placementID}
                    winningOfferRank={winningOfferRank}
                  />
                </Content>
              </Item>
            )}
          </Tabs>
        </View>
      );
    }
  }

  return content;
};

IneligibleOffers.propTypes = {
  offer: PropTypes.any,
};

export default IneligibleOffers;
