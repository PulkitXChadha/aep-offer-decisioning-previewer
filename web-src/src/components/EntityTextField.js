import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, Button, View } from "@adobe/react-spectrum";
const EntityText = (props) => {
  let valueInput = null;
  if (props.isVisible) {
    valueInput = (
      <TextField
        width="100%"
        maxWidth="100%"
        label="Enter Profile ID"
        labelPosition="side"
        labelAlign="end"
        isRequired={true}
        onChange={props.handleOnChange}
      />
    );
  }

  let offerButton = null;

  if (entityValue) {
    offerButton = (
      <Button
        variant="primary"
        onPress={props.handleOnClick}
        isDisabled={!entityValue}
      >
        Get Offer
      </Button>
    );

    return (
      <View>
        {valueInput}
        {offerButton}
      </View>
    );
  }

  EntityText.propTypes = {
    handleOnClick: PropTypes.func,
    isVisible: PropTypes.bool,
    handleOnChange: PropTypes.func,
  };
};
export default EntityText;
