import React, { useEffect } from "react";

import actionWebInvoke from "../utils";
const UserSettingsContext = React.createContext();
const UserSettingsDispatchContext = React.createContext();

const UserSettingsProvider = ({ children, userID }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    actionWebInvoke(
      "get-aio-state",
      {},
      {
        key: `${userID}-app-settings`,
      }
    )
      .then((response) => {
        setDarkMode(response);
      })
      .catch((e) => {
        throw new Error(`retrieval of settings failed with ${e}`);
      });
  }, []);

  useEffect(() => {
    actionWebInvoke(
      "update-aio-state",
      {},
      {
        key: `${userID}-app-settings`,
        value: darkMode,
        ttl: -1, //forever
      }
    )
      // .then((response) => {
      //   console.log(JSON.stringify(response));
      // })
      .catch((e) => {
        throw new Error(`update of settings failed with ${e}`);
      });
  }, [darkMode]);
  return (
    <UserSettingsContext.Provider value={darkMode}>
      <UserSettingsDispatchContext.Provider value={setDarkMode}>
        {children}
      </UserSettingsDispatchContext.Provider>
    </UserSettingsContext.Provider>
  );
};

function useSettingsState() {
  const context = React.useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsState must be used within a UserSettingsContext"
    );
  }
  return context;
}

function useSettingsDispatch() {
  const context = React.useContext(UserSettingsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsDispatch must be used within a UserSettingsContext"
    );
  }
  return context;
}

export { UserSettingsProvider, useSettingsState, useSettingsDispatch };
