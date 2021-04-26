import PropTypes from "prop-types";
import React from "react";
import { Text, Divider, View, Button, Grid } from "@adobe/react-spectrum";
import DeleteIcon from "@spectrum-icons/workflow/Delete";

const AIOState = (props) => {
  return (
    // <View>
    //   <Text>{props.stateIndex}</Text>
    //   <Text>{props.stateKey}</Text>
    //   <Text>{JSON.stringify(props.stateValue)}</Text>
    //   <Text>{props.stateExpiration}</Text>
    //   <Button
    //     alignSelf="center"
    //     variant="primary"
    //     onPress={() => {
    //       console.log(props.stateKe);
    //     }}
    //   >
    //     <DeleteIcon />
    //     <Text>Delete</Text>
    //   </Button>
    // </View>
    <Grid
      areas={["index key value expiration deleteButton"]}
      columns={["1fr", "1fr", "1fr", "1fr"]}
      height="size-1000"
      gap="size-100"
    >
      <View backgroundColor="celery-600" gridArea="index"></View>
      <View backgroundColor="blue-600" gridArea="key"></View>
      <View backgroundColor="purple-600" gridArea="value"></View>
      <View backgroundColor="magenta-600" gridArea="expiration"></View>
      <View backgroundColor="magenta-600" gridArea="deleteButton"></View>
    </Grid>
  );
};

AIOState.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default AIOState;
