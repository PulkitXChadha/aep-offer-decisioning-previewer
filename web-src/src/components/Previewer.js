/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  View,
  Flex,
  Heading,
  TextField,
  Button,
  Text,
  Divider,
  Switch,
} from "@adobe/react-spectrum";
import { Tabs, Item } from "@react-spectrum/tabs";
import {
  ProfileProvider,
  useProfileState,
  useProfileDispatch,
} from "../context/ProfileViewContext.js";

import OfferIcon from "@spectrum-icons/workflow/Offer";
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
  const [eventCount, setEventCount] = useState();
  const [sandboxName, setSandboxName] = useState(null);
  const [containerID, setContainerID] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState();
  const [
    selectedActivityPlacements,
    setSelectedActivityPlacements,
  ] = useState();
  const [
    selectedActivityCollections,
    setSelectedActivityCollections,
  ] = useState();
  const [selectedPlacement, setSelectedPlacement] = useState();
  const [selectedNamespace, setSelectedNamespace] = useState();
  let [entityValue, setEntityValue] = useState();

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
    setSelectedActivityPlacements(null);
    setSelectedActivityCollections(null);
    setSelectedPlacement(null);
    setSelectedNamespace(null);
    setSelectedNamespace(null);
    setEntityValue(null);
    setSandboxName(props.sandboxName);
    setContainerID(props.containerID);
  }, [props.sandboxName, props.containerID]);

  let header = <Heading level={3}>ODE Previewer</Heading>;

  let activities = null;
  let placement = null;
  let valueInput = null;
  let identityNamespace = null;

  if (containerID) {
    activities = (
      <ActivityList
        ims={props.ims}
        containerID={containerID}
        onSelectionChange={(id, placements, collections) => {
          setSelectedActivity(id);
          setSelectedActivityPlacements(placements);
          setSelectedActivityCollections(collections);
          setSelectedPlacement(null);
        }}
      />
    );

    placement = (
      <PlacementList
        ims={props.ims}
        containerID={containerID}
        isDisabled={selectedActivity ? false : true}
        defaultSelection={selectedPlacement}
        enabledPlacements={selectedActivityPlacements}
        onSelectionChange={(id) => {
          setSelectedPlacement(id);
        }}
      />
    );

    identityNamespace = (
      <NamespaceList
        ims={props.ims}
        sandboxName={sandboxName}
        onSelectionChange={(id) => {
          setSelectedNamespace(id);
        }}
      />
    );
    valueInput = (
      <TextField
        width="100%"
        maxWidth="100%"
        isDisabled={selectedNamespace ? false : true}
        label={`Enter ${selectedNamespace} ID value`}
        labelPosition="side"
        labelAlign="end"
        isRequired={true}
        onChange={setEntityValue}
        inputMode="text"
        maxLength="255"
      />
    );
  }

  let offerButton = null;
  let offerToggle = null;
  offerButton = (
    <Button
      variant="primary"
      onPress={() => {
        setGetOffer(true);
        setGetProfile(true);
        setGetExperienceEvents(true);
      }}
      isDisabled={
        !entityValue ||
        !selectedActivityPlacements ||
        !selectedPlacement ||
        !selectedNamespace
      }
    >
      <OfferIcon />
      <Text>Get Offer Decision</Text>
    </Button>
  );
  offerToggle = (
    <Switch isSelected={dryRunFlag} onChange={setDryRunFlag}>
      Dry Run
    </Switch>
  );

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
        collections={selectedActivityCollections}
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
        <Item
          title={`Experience Events ${eventCount ? `(${eventCount})` : ``}`}
          key="ee"
        >
          <ExperienceEventsView
            ims={props.ims}
            identityNamespace={selectedNamespace}
            identityValue={entityValue}
            sandboxName={sandboxName}
            onLoad={(count) => {
              setEventCount(count);
            }}
          />
        </Item>
      </Tabs>
    );
  }

  return (
    <div css={css`
      height: calc(100vh - var(--spectrum-global-dimension-size-400));
    `}>
      <Grid
        areas={[
          "header header header header header header",
          "activity activity placement placement placeholder placeholder",
          "namespace namespace entityValue entityValue offer offerToggle",
          "spacing spacing spacing spacing spacing spacing",
          "content content content content content content",
        ]}
        columns={["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]}
        rows={["size-400", "size-400", "size-400", "size-100", "auto"]}
        height="100%"
        gap="size-200"
        columnGap="size-300"
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
        <ProfileProvider>
          <View gridArea="content" overflow="auto">
            <Flex gap="size-400">
              <View>
                {offerContent}
              </View>
              <View>
                {profileContent}
              </View>
            </Flex>
          </View>
        </ProfileProvider>
      </Grid>
    </div>
  );
};

Previewer.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default Previewer;
