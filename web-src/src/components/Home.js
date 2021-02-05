/*
 * <license header>
 */

import React from "react";
import {
  Heading,
  View,
  IllustratedMessage,
  Content,
  ProgressCircle,
} from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
const Home = ({
  isSandboxSelected = false,
  isLoading = false,
  firstName = "",
}) => {
  return (
    <View width="size-6000">
      <Heading level={1}>
        {firstName ? `${firstName}, ` : ""}Welcome to Offer Decisioning Engine
        Previewer!
      </Heading>
      <ProgressCircle
        id="home-page-progress-circle"
        aria-label="Getting Containers"
        isIndeterminate
        isHidden={!isLoading}
        marginStart="size-100"
      />
      {!isLoading && !isSandboxSelected && (
        <IllustratedMessage>
          <NotFound />
          <Heading>Select a Sandbox</Heading>
          <Content>To Continue</Content>
        </IllustratedMessage>
      )}
    </View>
  );
};

export default Home;
