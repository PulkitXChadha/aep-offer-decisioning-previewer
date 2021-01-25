import React, { useState, useEffect } from "react";

import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import {
  Content,
  Image,
  ProgressCircle,
  IllustratedMessage,
  Heading,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import Error from "@spectrum-icons/illustrations/Error";

const ProfileView = (props) => {
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const profile = useActionWebInvoke({
    actionName: "get-profile",
    headers: headers,
    params: {
      identityNamespace: props.identityNamespace,
      identityValue: props.identityValue,
      sandboxName: props.sandboxName,
    },
  });
  let content = (
    <ProgressCircle
      id="profile-view-progress-circle"
      aria-label="Getting Profile"
      isIndeterminate
      isHidden={!profile.isLoading}
      marginStart="size-100"
    />
  );

  if (!profile.isLoading && profile.error) {
    content = (
      <IllustratedMessage>
        <Error />
        <Heading>Error 500: Internal server error</Heading>
        <Content>Something went wrong. Please try again later.</Content>
        <Content>{profile.error.message}</Content>
      </IllustratedMessage>
    );
  }
  // let showFields = ["profile"];

  if (!profile.isLoading && profile.data) {
    const keys = Object.keys(profile.data);
    content = (
      <ReactJson
        src={profile.data[keys[0]].entity}
        name="profile"
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        // shouldCollapse={(field) => {
        //   console.log(field);
        //   return showFields.indexOf(field.name) != -1 ? false : true;
        // }}
      />
    );
  }

  return content;
};

ProfileView.propTypes = {
  offer: PropTypes.any,
};

export default ProfileView;
