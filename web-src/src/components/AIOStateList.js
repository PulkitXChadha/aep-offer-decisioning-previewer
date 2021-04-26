import PropTypes from "prop-types";
import React from "react";
import {
  Text,
  ProgressCircle,
  View,
  Grid,
  Heading,
  repeat,
  Header,
} from "@adobe/react-spectrum";

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

  if (allState.data.keys) {
    let header = Object.keys(allState.data.keys[0]);

    console.log(JSON.stringify(header));
    console.log(JSON.stringify(allState.data.keys));

    // stateList = (
    //   <View>
    //     <table id="stateList">
    //       <tbody>
    //         <tr>
    //           {header.map((key, index) => {
    //             return <th key={index}>{key.toUpperCase()}</th>;
    //           })}
    //         </tr>
    //         {allState.data.keys.map((element, index) => {
    //           console.log(JSON.stringify(element));
    //           const { key, value, expiration } = element; //destructuring
    //           return (
    //             <tr key={key}>
    //               <td>{key}</td>
    //               <td>{JSON.stringify(value)}</td>
    //               <td>{expiration}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </View>
    // );

    stateList = (
      <Grid
        columns="auto-fit"
        autoRows={repeat("auto-fit", "size-800")}
        justifyContent="center"
        gap="size-100"
      >
        <Heading level={3}>AIO State Entries</Heading>
        {allState.data.keys.map((element) => (
          <AIOState
            stateKey={element.key}
            stateValue={element.value}
            stateExpiration={element.expiration}
          />
        ))}
      </Grid>
    );
  }

  return stateList;
};

AIOStateList.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default AIOStateList;
