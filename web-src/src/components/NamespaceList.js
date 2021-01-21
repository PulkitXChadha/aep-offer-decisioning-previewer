import React from "react";
import PropTypes from "prop-types";
import { Picker, ProgressCircle, Item, Text } from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

const NamespaceList = (props) => {
  //Identity Namespace State
  let headers = {};
  // set the authorization header and org from the ims props object
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }
  const namespaces = useActionWebInvoke({
    actionName: "get-identity-preview-report",
    headers: headers,
    params: {
      sandboxName: props.sandboxName,
    },
  });

  let picker = (
    <ProgressCircle
      id="namespace-list-progress-circle"
      aria-label="Getting Identity Namespaces"
      isIndeterminate
      isHidden={!namespaces.isLoading}
      marginStart="size-100"
    />
  );

  if (namespaces.error) {
    picker = <Text>{namespaces.error.message}</Text>;
  }

  if (!namespaces.data && !namespaces.error && !namespaces.isLoading) {
    picker = <Text>You have no namespaces !</Text>;
  }

  if (namespaces.data) {
    picker = (
      <Picker
        id="namespaces-list-picker"
        width="100%"
        maxWidth="100%"
        label="Select Identity Namespace"
        labelPosition="side"
        labelAlign="end"
        isRequired={true}
        placeholder="select an identity namespace"
        aria-label="select an identity namespace"
        items={namespaces.data.data.map((namespace) => ({
          code: namespace.code,
        }))}
        itemKey="code"
        onSelectionChange={props.onSelectionChange}
      >
        {(item) => <Item key={item.code}>{item.code}</Item>}
      </Picker>
    );
  }

  return picker;
};

NamespaceList.propTypes = {
  ims: PropTypes.any,
  sandboxName: PropTypes.string,
  onSelectionChange: PropTypes.func,
};

export default NamespaceList;
