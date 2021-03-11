import PropTypes from "prop-types";
import React from "react";
import { Text, Divider, View, Button, Grid } from "@adobe/react-spectrum";
import DeleteIcon from "@spectrum-icons/workflow/Delete";

const AIOState = (props) => {
  return (
    <Grid
      areas={["index key value expiration button"]}
      columns={["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]}
      rows={["size-600"]}
      justifyContent="left"
      gap="size-100"
    >
      <View gridArea="index">
        <Text>{props.stateIndex}</Text>
      </View>
      <View gridArea="key">
        <Text>{props.stateKey}</Text>
      </View>
      <View gridArea="value">
        <Text>{JSON.stringify(props.stateValue)}</Text>
      </View>
      <View gridArea="expiration">
        <Text>{props.stateExpiration}</Text>
      </View>
      <View gridArea="button">
        <Button
          alignSelf="center"
          variant="primary"
          onPress={() => {
            console.log(props.stateKe);
          }}
        >
          <DeleteIcon />
          <Text>Delete</Text>
        </Button>
      </View>
    </Grid>
  );
};

AIOState.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default AIOState;
