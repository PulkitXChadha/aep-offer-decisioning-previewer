import PropTypes from "prop-types";
import React from "react";
import { Text, ProgressCircle, View } from "@adobe/react-spectrum";

import AIOState from "./AIOState";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";
import Table from "react-bootstrap/Table";

const AIOStateList = (props) => {
  // const allState = useActionWebInvoke({
  //   actionName: "get-all-state",
  //   headers: {},
  //   params: {},
  // });

  const allState = {
    data: {
      keys: [
        { key: "key 1", value: false, expiration: null },
        { key: "key 2", value: false, expiration: null },
        { key: "key 3", value: false, expiration: null },
      ],
    },
  };
  let stateList = (
    <ProgressCircle
      id="sandbox-list-progress-circle"
      aria-label="Getting Sandboxes"
      isIndeterminate
      isHidden={!allState.isLoading}
      marginStart="size-100"
    />
  );

  if (allState.error) {
    stateList = <Text>{allState.error.message}</Text>;
  }

  if (!allState.data && !allState.error && !allState.isLoading) {
    stateList = <Text>You have no allState !</Text>;
  }

  if (allState.data) {
    console.log(JSON.stringify(allState.data.keys));
    stateList = (
      <View>
        {allState.data.keys.map((element) => (
          <AIOState
            stateKey={element.key}
            stateValue={element.value}
            stateExpiration={element.expiration}
          />
        ))}
      </View>
    );
  }

  return stateList;
};

AIOStateList.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default AIOStateList;
