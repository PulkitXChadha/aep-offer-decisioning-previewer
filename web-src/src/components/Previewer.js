import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Heading,
  TextField,
  Button,
  View,
  Divider,
  Switch,
} from "@adobe/react-spectrum";
import { Tabs, Item } from "@react-spectrum/tabs";

import ActivityList from "./ActivityList";
import PlacementList from "./PlacementList";
import NamespaceList from "./NamespaceList";
import OfferRender from "./OfferRender";
import ProfileView from "./ProfileView";

import ExperienceEventsView from "./ExperienceEventsView";

const Previewer = (props) => {
  const [dryRunFlag, setDryRunFlag] = useState(true);
  const [getOffer, setGetOffer] = useState(false);
  const [getProfile, setGetProfile] = useState(false);
  const [getExperienceEvents, setGetExperienceEvents] = useState(false);
  const [sandboxName, setSandboxName] = useState(null);
  const [containerID, setContainerID] = useState(null);

  const [selectedActivity, setSelectedActivity] = useState();
  const [selectedPlacement, setSelectedPlacement] = useState();
  const [selectedNamespace, setSelectedNamespace] = useState();
  let [entityValue, setEntityValue] = React.useState();

  //refresh profile and experience events went entity value or selectedNamespace change
  useEffect(() => {
    setGetProfile(false);
    setGetExperienceEvents(false);
  }, [entityValue, selectedNamespace]);

  //refresh offer when any of the inputs change
  useEffect(() => {
    setGetOffer(false);
  }, [
    selectedActivity,
    selectedPlacement,
    selectedNamespace,
    entityValue,
    dryRunFlag,
  ]);

  //Update page if sandbox or container change
  useEffect(() => {
    setDryRunFlag(true);
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
  let offerToggle = null;
  if (entityValue) {
    offerButton = (
      <Button
        variant="primary"
        onPress={() => {
          setGetOffer(true);
          setGetProfile(true);
          setGetExperienceEvents(true);
        }}
        isDisabled={!entityValue}
      >
        Get Offer
      </Button>
    );
    offerToggle = (
      <Switch isSelected={dryRunFlag} onChange={setDryRunFlag}>
        Dry Run
      </Switch>
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
        dryRunFlag={dryRunFlag}
      />
    );
  }

  let profileContent = null;
  if (getProfile && getExperienceEvents) {
    profileContent = (
      <Tabs aria-label="Profile Data">
        <Item title="Profile" key="profile">
          <ProfileView
            ims={props.ims}
            identityNamespace={selectedNamespace}
            identityValue={entityValue}
            sandboxName={sandboxName}
          />
        </Item>
        <Item title="Experience Events" key="ee">
          <ExperienceEventsView
            ims={props.ims}
            identityNamespace={selectedNamespace}
            identityValue={entityValue}
            sandboxName={sandboxName}
          />
        </Item>
      </Tabs>
    );
  }

  return (
    <Grid
      areas={[
        "header header header header header header",
        "activity activity activity placement placement placement",
        "namespace namespace entityValue entityValue offer offerToggle",
        "spacing spacing spacing spacing spacing spacing",
        "content content content profileContent profileContent profileContent",
      ]}
      columns={["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]}
      rows={["size-400", "size-400", "size-400", "size-100", "auto"]}
      height="100vh"
      gap="size-100"
    >
      <View gridArea="header">{header}</View>
      <View gridArea="activity">{activities}</View>
      <View gridArea="placement">{placement}</View>
      <View gridArea="namespace">{identityNamespace}</View>
      <View gridArea="entityValue">{valueInput}</View>
      <View gridArea="offer">{offerButton}</View>
      <View gridArea="offerToggle">{offerToggle}</View>
      <View gridArea="spacing">
        <Divider></Divider>
      </View>
      <View gridArea="content">{offerContent}</View>
      <View gridArea="profileContent">{profileContent}</View>
    </Grid>
  );
};

Previewer.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default Previewer;
