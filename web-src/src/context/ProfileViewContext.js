import React from "react";

const ProfileContext = React.createContext();
const ProfileDispatchContext = React.createContext();

const ProfileProvider = ({ children }) => {
  const [profileAttributesInRule, setProfileAttributesInRule] = React.useState(
    []
  );

  return (
    <ProfileContext.Provider value={profileAttributesInRule}>
      <ProfileDispatchContext.Provider value={setProfileAttributesInRule}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
};

function useProfileState() {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileState must be used within a ProfileContext");
  }
  return context;
}
function useProfileDispatch() {
  const context = React.useContext(ProfileDispatchContext);
  if (context === undefined) {
    throw new Error("useProfileDispatch must be used within a ProfileContext");
  }
  return context;
}

export { ProfileProvider, useProfileState, useProfileDispatch };
