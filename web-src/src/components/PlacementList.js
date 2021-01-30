import React from "react";
import PropTypes from "prop-types";
import { Picker, ProgressCircle, Item, Text } from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

const PlacementList = (props) => {
  const enabledPlacements = props.enabledPlacements || [];
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const placements = useActionWebInvoke({
    actionName: "get-placements",
    headers: headers,
    params: {
      containerID: props.containerID,
    },
  });

  let picker = (
    <ProgressCircle
      id="placement-list-progress-circle"
      aria-label="Getting Offer Placement"
      isIndeterminate
      isHidden={!placements.isLoading}
      marginStart="size-100"
    />
  );

  if (placements.error) {
    picker = <Text>{placements.error.message}</Text>;
  }

  if (!placements.data && !placements.error && !placements.isLoading) {
    picker = <Text>You have no placements !</Text>;
  }
  if (placements.data) {
    const disabledKeys = placements.data._embedded.results
      .filter(
        (placement) => !enabledPlacements.includes(placement._instance["@id"])
      )
      .map((placement) => placement._instance["@id"]);

    picker = (
      <Picker
        id="placement-list-picker"
        width="100%"
        maxWidth="100%"
        label="Select Offer Placement"
        labelPosition="side"
        labelAlign="end"
        isRequired={true}
        placeholder="select a placement"
        aria-label="select a placement"
        items={placements.data._embedded.results.map((placement) => ({
          name: placement._instance["xdm:name"],
          id: placement._instance["@id"],
        }))}
        itemKey="id"
        isDisabled={props.isDisabled}
        selectedKey={props.defaultSelection}
        disabledKeys={disabledKeys}
        onSelectionChange={props.onSelectionChange}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Picker>
    );
  }

  return picker;
};

PlacementList.propTypes = {
  runtime: PropTypes.any,
  containerID: PropTypes.string,
  ims: PropTypes.any,
};

export default PlacementList;
