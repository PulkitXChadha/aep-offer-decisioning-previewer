/*
 * <license header>
 */

/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useEffect } from "react";
import {
  Provider,
  defaultTheme,
  lightTheme,
  Grid,
  Flex,
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
    <View margin="size-200">
      <SideBar isSandboxSelected={sandboxName ? true : false}></SideBar>
    </View>
  );
  const greyRibbon = userSettings ? "gray-600" : "gray-900";
  let sandboxSelector = (
    <Provider theme={lightTheme} colorScheme={`dark`}>
      <View
        paddingStart="size-200"
        backgroundColor={
          sandboxName
            ? sandboxName != "prod"
            ? greyRibbon
            : "blue-400"
            : "blue-400"
        }
      >
        <Flex alignItems="center">
          <View flex="1">
            <SandboxPicker
              ims={props.ims}
              onSelectionChange={handleSandboxSelection}
            />
          </View>
          <View>
            <Toggle
              isSelected={userSettings}
              onChange={() => setUserSettings(!userSettings)}
            >
              Dark mode
            </Toggle>
          </View>
        </Flex>
      </View>
    </Provider>
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
          <View height="100vh" overflow="hidden">
            <View elementType="header" height="size-400" position="fixed" width="100vw">
              {sandboxSelector}
            </View>
            <main css={css`
              height: calc(100vh - var(--spectrum-global-dimension-size-400));
              padding-top: var(--spectrum-global-dimension-size-400);
              `}>
              <Grid id="Grid" areas={['nav main']} columns={['size-3000', 'auto']} height="100%">
                <View
                  id="Sidenav"
                  backgroundColor="gray-75"
                  gridArea="nav"
                  position="fixed"
                  width="size-3000"
                  height="100%">
                  {sidebar}
                </View>
                <View gridArea="main">
                  {redirectTo}
                  {routes}
                </View>
              </Grid>
            </main>
          </View>
        </Provider>
      </Router>
    </ErrorBoundary>
  );

  // error handler on UI rendering failure
  function onError(e, componentStack) {}

  // component to show if UI fails rendering
  function fallbackComponent({ componentStack, error }) {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Something went wrong :(
        </h1>
        <pre>{componentStack + "\n" + error.message}</pre>
      </div>
    );
  }
};

export default App;
