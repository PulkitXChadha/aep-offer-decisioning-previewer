/*
 * <license header>
 */

import React, { useState, useEffect } from "react";
import {
  Provider,
  defaultTheme,
  lightTheme,
  Grid,
  View,
} from "@adobe/react-spectrum";
import ErrorBoundary from "react-error-boundary";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Switch as Toggle } from "@adobe/react-spectrum";
import SideBar from "./SideBar";
import Previewer from "./Previewer";
import SandboxPicker from "./SandboxPicker";
import Home from "./Home";
import { About } from "./About";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";
import {
  useSettingsState,
  useSettingsDispatch,
} from "../context/UserSettingsContext.js";

const App = (props) => {
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  const userSettings = useSettingsState();

  const setUserSettings = useSettingsDispatch();
  const [sandboxName, setSandboxName] = useState(null);
  const [containerID, setContainerID] = useState(null);
  const [redirect, setRedirect] = useState(false);
  let redirectTo = null;
  if (redirect) {
    redirectTo = <Redirect to="/" />;
  }
  useEffect(() => {
    setRedirect(true);
  }, [containerID]);

  const containerIDs = useActionWebInvoke({
    actionName: "get-container",
    headers: headers,
  });

  const handleSandboxSelection = (id) => {
    const newContainerID = containerIDs.data._embedded[
      "https://ns.adobe.com/experience/xcore/container"
    ].find((element) => element._instance.parentName == id).instanceId;
    setSandboxName(id);
    setContainerID(newContainerID);
    setRedirect(false);
  };

  let sidebar = (
    <View
      gridArea="sidebar"
      backgroundColor="gray-200"
      padding="size-200"
      marginTop="size-400"
      position="fixed"
      left="200"
      width="200px"
      height="400vh"
    >
      <SideBar isSandboxSelected={sandboxName ? true : false}></SideBar>
    </View>
  );
  const greyRibbon = userSettings ? "gray-600" : "gray-900";
  let sandboxSelector = (
    <View
      // position="fixed"
      backgroundColor={
        sandboxName
          ? sandboxName != "prod"
            ? greyRibbon
            : "blue-400"
          : "blue-400"
      }
      gridArea="header"
    >
      <Provider theme={lightTheme} colorScheme={`dark`}>
        <SandboxPicker
          ims={props.ims}
          onSelectionChange={handleSandboxSelection}
        />
        <View position="fixed" end="10px">
          <Toggle
            isSelected={userSettings}
            onChange={() => setUserSettings(!userSettings)}
          >
            Dark mode
          </Toggle>
        </View>
      </Provider>
    </View>
  );

  let routes = (
    <View gridArea="content" padding="size-200">
      <Switch>
        <Route exact path="/">
          <Home
            isLoading={containerIDs.isLoading}
            isSandboxSelected={sandboxName ? true : false}
            firstName={props.ims.profile.first_name}
          ></Home>
        </Route>
        <Route path="/previewer">
          <Previewer
            ims={props.ims}
            containerID={containerID}
            sandboxName={sandboxName}
          />
        </Route>
        <Route path="/about">
          <About></About>
        </Route>
      </Switch>
    </View>
  );
  return (
    <ErrorBoundary onError={onError} FallbackComponent={fallbackComponent}>
      <Router>
        <Provider
          theme={defaultTheme}
          colorScheme={userSettings ? `dark` : `light`}
        >
          <Grid
            areas={["header  header", "sidebar content"]}
            columns={["256px", "3fr"]}
            rows={["size-400", "auto"]}
            height="100vh"
            gap="size-100"
          >
            {redirectTo}
            {sidebar}
            {sandboxSelector}
            {routes}
          </Grid>
        </Provider>
      </Router>
    </ErrorBoundary>
  );

  // error handler on UI rendering failure
  function onError(e, componentStack) {}

  // component to show if UI fails rendering
  function fallbackComponent({ componentStack, error }) {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Something went wrong :(
        </h1>
        <pre>{componentStack + "\n" + error.message}</pre>
      </React.Fragment>
    );
  }
};

export default App;
