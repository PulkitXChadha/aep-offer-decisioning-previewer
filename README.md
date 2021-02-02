# Adobe Offer Decisioning Engine Preview App

Welcome to ODE Previewer a Adobe I/O Application to view Offer representations for a selected unified profiles. Easily view and test the experiences delivered to your customers via Adobe Experience Platform.

## Table Of Contents

- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Local Dev](#local-dev)
- [Test & Coverage](#test---coverage)
- [Deploy & Cleanup](#deploy---cleanup)
- [Config](#config)
  - [`.env`](#-env-)
  - [`manifest.yml`](#-manifestyml-)
- [Debugging in VS Code](#debugging-in-vs-code)
- [Additional Resources](#additional-resources)

## Usage

- Start by selecting the sandbox you are working in (Note: you will only see sandboxes that your Adobe ID has access to.)

- From the sidebar select `Previewer`

- Wait for the backend actions to retrieve the list of activities in the sandbox

---

## Folder Structure

```bash
├── actions  #this folder is intended for backend source code for all serverless actions
│   ├── ODE
│   │   ├── get-activities.js # action to get a list of all ODE activities in the AEP instance
│   │   ├── get-container.js # action to get the ODE container ID for the sandbox selected.
│   │   ├── get-offer-representation.js # action to get the ODE container ID for the sandbox selected.
│   │   ├── get-placements.js # action to get the ODE container ID for the sandbox selected.
│   ├── PALM
│   │   ├── get-sandboxes.js # action to get a list of all sandboxes in the AEP instance
│   ├── UPS
│   │   ├── get-identity-namespaces.js # action to get list of all Identity Namespaces.
│   │   ├── get-identity-preview-report.js # action to get list of all populated Identity Namespaces.
│   │   ├── get-profile.js # action to get Unified Profile based on an entity value lookup.
│   ├── utils.js
├── web-src   #this folder is intended for frontend source code such as html templates, react components, JS, CSS
│   ├── index.html
│   ├── src
│   │    ├── components
│   │    │    ├── About.js
│   │    │    ├── ActivityList.js  # React Component for Activity Picker.
│   │    │    ├── App.js
│   │    │    ├── Home.js
│   │    │    ├── NamespaceList.js # React Component for Identity Namespace drop down.
│   │    │    ├── OfferRender.js   # React Component to Render Offer Content.
│   │    │    ├── PlacementList.js  # React Component for Placement drop down.
│   │    │    ├── SandboxPicker.js  # React Component for Sandbox Picker Ribbon.
│   │    │    ├── SideBar.js  # React Component for Side Bar.
│   │    ├── exc-runtime.js
│   │    ├── index.css
│   │    ├── index.js
│   │    ├── utils.js
├── e2e  #this folder is intended for end-to-end tests
├── test  #this folder is intended for back-end action unit tests and integration tests
├── manifest.yml #this file describes the backend actions you would like to deploy or to redeploy
├── README.md
├── package.json #this file describes project definition and various metadata relevant to the project.
└── .gitignore
```

---

## Setup

- Populate the `.env` file in the project root and fill it as shown [below](#env)

## Local Dev

- `aio app run --local` to start your local Dev server
- App will run on `localhost:9080` by default

By default the UI will be served locally but actions will be deployed and served from Adobe I/O Runtime. To start a
local serverless stack and also run your actions locally use the `aio app run --local` option.

## Test & Coverage

- Run `aio app test` to run unit tests for ui and actions
- Run `aio app test -e` to run e2e tests

## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

## Config

### `.env`

```bash
# This file must not be committed to source control

## please provide your Adobe I/O Runtime credentials
AIO_runtime_auth=
AIO_runtime_namespace=
AIO_runtime_apihost=
## Adobe I/O Console service account credentials (JWT) Api Key
SERVICE_API_KEY=
```

### `manifest.yml`

- List your backend actions under the `actions` field within the `__APP_PACKAGE__`
  package placeholder. We will take care of replacing the package name placeholder
  by your project name and version.
- For each action, use the `function` field to indicate the path to the action
  code.
- More documentation for supported action fields can be found
  [here](https://github.com/apache/incubator-openwhisk-wskdeploy/blob/master/specification/html/spec_actions.md#actions).

---

## Debugging in VS Code

While running your local server (`aio app run`), both UI and actions can be debugged, to do so open the vscode debugger
and select the debugging configuration called `WebAndActions`.
Alternatively, there are also debug configs for only UI and each separate action.

---

## Additional Resources

### Adobe I/O

- [Firefly Apps](https://github.com/AdobeDocs/project-firefly/blob/master/README.md#project-firefly-developer-guide)
- [Adobe I/O SDK](https://github.com/adobe/aio-sdk#adobeaio-sdk)
- [Adobe I/O Runtime](https://adobedocs.github.io/adobeio-runtime/)
- [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html)

### Adobe Experience Platform - Unified Profile

- [Overview](https://experienceleague.adobe.com/docs/experience-platform/profile/home.html?lang=en)
- [Unified Profile API Reference](https://experienceleague.adobe.com/docs/experience-platform/profile/home.html?lang=en#api)

### Adobe Offer Decisioning Engine

- [Getting Started](https://experienceleague.adobe.com/docs/offer-decisioning/using/get-started/starting-offer-decisioning.html?lang=en#get-started)
- [Offer Decisioning API Reference](https://experienceleague.adobe.com/docs/offer-decisioning/using/api-reference/getting-started.html?lang=en#api-reference)

## Releases

### v0.0.5

- Added validation to Get Offer button be disabled if any of the inputs are not populated.
- Does not cache Experience Events responses to session/local storage
- Added IMS user's first name to the greeting of the app.
- Added support for Dark Mode.

### v0.0.4

- Added session caching of API responses to improve App performance.
- Updated Offer Metric component to not cache API responses.
- Disable Placements not part of the activity selected
- Profile JSON collapse all attributes that are not part of the decision condition.

### v0.0.3

- Added support to render JSON and HTML representation of offers
- Sort sandbox list based on name.
- Cleaned display of events data removing datatypes and length.
- Added dry run toggle to switch between various modes of offer decisioning.
- Added offer capping metric Meter component to

## Features Requested

- Show sample profiles based on decision rule.
- Show proposition history events.
- Show lineage followed to make the offer decision.
- Show Decision API call.
- Add integration tests.
- Add better error handling.
- Document How to install the app on a new IMS org.
- Document how to use the App
