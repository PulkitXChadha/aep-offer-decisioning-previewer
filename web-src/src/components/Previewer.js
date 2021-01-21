import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Heading,
  TextField,
  Button,
  View,
  Divider,
} from "@adobe/react-spectrum";

import ActivityList from "./ActivityList";
import PlacementList from "./PlacementList";
import NamespaceList from "./NamespaceList";
import OfferRender from "./OfferRender";

const Previewer = (props) => {
  const [getOffer, setGetOffer] = useState(false);
  // let sandboxName = props.sandboxName;
  // let containerID = props.containerID;

  const [sandboxName, setSandboxName] = useState(null);
  const [containerID, setContainerID] = useState(null);

  const [selectedActivity, setSelectedActivity] = useState();
  const [selectedPlacement, setSelectedPlacement] = useState();
  const [selectedNamespace, setSelectedNamespace] = useState();
  let [entityValue, setEntityValue] = React.useState();

  useEffect(() => {
    setGetOffer(false);
  }, [selectedActivity, selectedPlacement,selectedNamespace,entityValue]);


  useEffect(() => {
    setGetOffer(false);
    setSelectedActivity(null);
    setSelectedPlacement(null);
    setSelectedNamespace(null);
    setSelectedNamespace(null);
    setEntityValue(null);
    setSandboxName(props.sandboxName);
    setContainerID(props.containerID);
  }, [props.sandboxName, props.containerID]);

  let header = <Heading level={3}>ODE Previewer</Heading>;
  let activities = null;


  if (containerID) {
    activities = (
      <ActivityList
        ims={props.ims}
        containerID={containerID}
        onSelectionChange={(id) => {
          setSelectedActivity(id);
        }}
      />
    );
  }
  let placement = null;
  if (selectedActivity) {
    placement = (
      <PlacementList
        ims={props.ims}
        containerID={containerID}
        onSelectionChange={(id) => {
          setSelectedPlacement(id);
        }}
      />
    );
  }

  let identityNamespace = null;

  if (selectedPlacement) {
    identityNamespace = (
      <NamespaceList
        ims={props.ims}
        sandboxName={sandboxName}
        onSelectionChange={(id) => {
          setSelectedNamespace(id);
        }}
      />
    );
  }
  let valueInput = null;
  if (selectedNamespace) {
    valueInput = (
      <TextField
        width="100%"
        maxWidth="100%"
        label={`Enter ${selectedNamespace} ID value`}
        labelPosition="side"
        labelAlign="end"
        isRequired={true}
        onChange={setEntityValue}
      />
    );
  }

  let offerButton = null;

  if (entityValue) {
    offerButton = (
      <Button
        variant="primary"
        onPress={() => {
          if (!getOffer) setGetOffer(true);
        }}
        isDisabled={!entityValue}
      >
        Get Offer
      </Button>
    );
  }

  let offerContent = null;

  if (getOffer) {
    offerContent = (
      <OfferRender
        ims={props.ims}
        containerID={containerID}
        placementID={selectedPlacement}
        activityID={selectedActivity}
        identityNamespace={selectedNamespace}
        entityValue={entityValue}
      />
    );
  }

  return (
    <Grid
      areas={[
        "header header header header header header",
        "activity activity activity placement placement placement",
        "namespace namespace entityValue entityValue offer offer",
        "spacing spacing spacing spacing spacing spacing",
        "content content content content content content",
      ]}
      columns={["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]}
      rows={["size-400", "size-400", "size-400", "auto"]}
      height="100vh"
      gap="size-100"
    >
      <View gridArea="header">{header}</View>
      <View gridArea="activity">{activities}</View>
      <View gridArea="placement">{placement}</View>{" "}
      <View gridArea="namespace">{identityNamespace}</View>
      <View gridArea="entityValue">{valueInput}</View>
      <View gridArea="offer">{offerButton}</View>
      <View gridArea="spacing">
        <Divider></Divider>
      </View>
      <View gridArea="content">{offerContent}</View>
    </Grid>
  );
};

Previewer.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default Previewer;
