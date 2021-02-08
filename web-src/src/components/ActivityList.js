import React from "react";
import PropTypes from "prop-types";
import { Picker, ProgressCircle, Item, Text } from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

const ActivityList = (props) => {
  let headers = {};
  // set the authorization header and org from the ims props object
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }
  const activities = useActionWebInvoke({
    actionName: "get-activities",
    headers: headers,
    params: {
      containerID: props.containerID,
    },
  });

  const onSelection = (id) => {
    const placements = activities.data._embedded.results
      .filter((activity) => activity._instance["@id"] === id)[0]
      ._instance["xdm:criteria"].map(
        (criteria) => criteria["xdm:placements"][0]
      );
    const allCollections = activities.data._embedded.results
      .filter((activity) => activity._instance["@id"] === id)[0]
      ._instance["xdm:criteria"].map(
        (criteria) => criteria["xdm:optionSelection"]["xdm:filter"] || null
      );

    const collections = [...new Set(allCollections)];

    props.onSelectionChange(id, placements, collections);
  };

  let picker = (
    <ProgressCircle
      id="activity-list-progress-circle"
      aria-label="Getting Offer Activities"
      isIndeterminate
      isHidden={!activities.isLoading}
      marginStart="size-100"
    />
  );

  if (activities.error) {
    picker = <Text>{activities.error.message}</Text>;
  }

  if (!activities.data && !activities.error && !activities.isLoading) {
    picker = <Text>You have no activities !</Text>;
  }

  if (activities.data) {
    picker = (
      <Picker
        id="activity-list-picker"
        width="100%"
        maxWidth="100%"
        label="Select Offer Activity"
        labelPosition="side"
        labelAlign="end"
        isRequired={true}
        aria-label="select an activity"
        items={activities.data._embedded.results.map((activity) => ({
          name: `${activity._instance["xdm:name"]}-(${activity._instance["xdm:status"]})`,
          id: activity._instance["@id"],
        }))}
        itemKey="id"
        onSelectionChange={onSelection}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Picker>
    );
  }

  return picker;
};

ActivityList.propTypes = {
  ims: PropTypes.any,
  containerID: PropTypes.string,
  onSelectionChange: PropTypes.func,
};

export default ActivityList;
