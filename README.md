# Adobe Offer Decisioning Engine Preview App

Welcome to ODE Previewer a Adobe I/O Application to view Offer representations for a selected unified profile. Easily view and test the experiences delivered to your customers via Adobe Experience Platform.

![](images/ODEPreviewerDemo.gif)

## Table Of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Create Product Profile](#create-product-profile)
  - [Creating a new Project in Adobe Developer Console](#creating-a-new-project-in-adobe-developer-console)
  - [Install Project Locally](#install-project-locally)
  - [Test & Coverage](#test---coverage)
  - [Deploy & Cleanup](#deploy---cleanup)
- [Project Folder Structure](#project-folder-structure)
- [Config Files](#config-files)
  - [`.env`](#-env-)
  - [`manifest.yml`](#-manifestyml-)
- [Additional Resources](#additional-resources)
  - [Adobe I/O](#adobe-i-o)
  - [Adobe Experience Platform - Unified Profile](#adobe-experience-platform---unified-profile)
  - [Adobe Offer Decisioning Engine](#adobe-offer-decisioning-engine)
- [Releases](#releases)
- [Features Requested](#features-requested)

## Installation

### Prerequisites

> To deploy and use this app you will need to provision Project Firefly on your Adobe Account. Follow the link for details on [How to Get Access to Project Firefly](https://www.adobe.io/apis/experienceplatform/project-firefly/docs.html#!AdobeDocs/project-firefly/master/overview/getting_access.md)

> Before you get started please ensure that you have all prerequisites on my workstation. Follow the link for details on how to [Setting up Your Environment](https://www.adobe.io/apis/experienceplatform/project-firefly/docs.html#!AdobeDocs/project-firefly/master/getting_started/setup.md)

### Create Product Profile

Access to all project Firefly apps is managed through [Adobe Admin Console](https://adminconsole.adobe.com). The recommended approach to managing access to the app using User Groups that have privileged Product Profiles. Follow the instructions below to set this up:

1. Create a user group with an appropriate name and description. Click `Save` when ready.

   ![Admin Create user Group](images/admin-create-user-group.png)

2. Create Adobe Experience Platform Product Profiles to manage privileges for the app workspaces. group with an appropriate name and description.

   - Go to Adobe Experience Platform Product in Admin console and click `New Profile`.
     ![Admin AEP Product Switcher](images/admin-aep-product.png)

   - Give the Profile an appropriate name and description and click `Next` when ready.
     ![Admin AEP Product Profile Name](images/admin-aep-product-profile-name.png)

   - Make sure to enable **Offer Decisioning** service and click `Done` when ready.
     ![Admin AEP Product Profile Services](images/admin-aep-product-profile-services.png)

   - The app at least needs the following roles:

     - `View Sandboxes`
     - `View Profiles`
     - `Execute Decisioning Activities`

   - Once all roles have been selected click `Save` when ready.
     ![Admin AEP Product Profile Services](images/admin-aep-product-profile-end.png)

### Creating a new Project in Adobe Developer Console

Adobe Developer Console gives you access to APIs, SDKs, and developer tools to build on, integrate, and extend Adobe products. This app needs access to Adobe I/O Runtime credentials and access to Adobe Experience Platform APIs. Follow the instructions to set up your project:

1. Navigate to [Adobe Developer Console](https://console.adobe.io/).

2. Use the Org Switcher on the upper right corner to ensure or to select the Org you want to use.
   ![Org Switcher](images/console-home.png)

3. Once you are in the correct organization, Under `Quick Start`, click on the option to `Create project from template`.
   **Note that if you don't this option, it might be because your request to access Project Firefly has not yet been approved.**

4. Select `Project Firefly` from the list of templates.
   ![](images/console-project-template.png)

5. Enter `Project Title` and `App Name` for your templated project.

   - `Project Title` Give a descriptive title to e.e "**ODE Previewer \<\<company name\>\>**"
   - `App Name` Please enter "**ODEPreviewerApp**". This should match the project name in `package.json`

   - Click `Save` when ready.
     ![](images/console-project-details.png)

6. You should see a new project has 2 default `Workspaces`. It is recommended to create workspaces for individual developers working on a project.

   - Create a new workspace by clicking the `+ Add workspace` button. Give the workspace an appropriate name and description.

   - Click `Save` when ready.
     ![](images/console-add-workspace.png)

7. Within each of the workspace you will need to add the service needed for the app.

   - Click the `+ Add service` button and select `API`
     ![](images/console-workspace-api.png)

   - Click on `Adobe Experience Platform` then select the `Experience Platform API` tile, click `Next ` when ready.
     ![](images/console-workspace-api-aep.png)

   - Select `Generate a new key pair` or upload a key pair you have already, click `Next ` when ready.
     ![](images/console-workspace-api-aep-keys.png)

   - Select the product profile created for in preview sets and click `Save configured API`.
     ![](images/console-workspace-api-aep-profile.png)

### Install Project Locally

1. On your machine, navigate to the Terminal and enter

   ```
   $ aio login
   ```

   This will open a browser window where you will need to enter your Adobe ID.
   ![](images/aio-login.png)

2. Clone the github repo

   ```
   $ git clone https://github.com/PulkitXChadha/aep-offer-decisioning-previewer.git
   ```

   ![](images/git-clone.png)

3. Change directory

   ```
   $ cd aep-offer-decisioning-previewer
   ```

4. Select the Organization, Project and workspace. the AIO CLI has helper commands to allow you to efficiently select the workspaces and have the app use the credentials associated with the workspace. The credentials included the `.aio`, `.env` and `config.json` files. You will need to run the following commands:

   - List all organizations you have access to `aio console org list`
   - Select the org you want to use `aio console org select <<IMS ORG>>`
   - List all Projects in the org `aio console project list`
   - Select the Project you want to use `aio console project select <<Project ID>>`
   - List all workspaces in the project `aio console workspace list`
   - Select the workspace you want to use `aio console workspace select <<workspace ID>>`
     ![](images/aio-org-project-workspace.png)

5. From within the project folder run the following command to downloads the relevant configuration files.
   `$ aio app use`
   ![](images/aio-app-use.png)
   This step will create `.aio`, `.env` and `config.json` files which include the credentials needed to run the app in the workspace.
   You can manually populate the `.env` file in the project root and fill it as shown [below](#env).

6. Install all node dependency libraries.From within the project folder run the following command

   ```
   $ npm install
   ```

   ![](images/npm-install.png)

7. Run locally (this step needs docker and docker images, see details in the [above](#prerequisites)). Ensure that Docker is running on you machine and run the following command:

   ```
   $ aio app:run --local
   ```

   > This step might that a few mins at first.

   > you might need to accept a self-signed certificate to use `https://localhost:9080`
   > When successful you should see the below message.
   > ![](images/aio-app-run-local.png)

8. Copy and paste the URL `https://experience.adobe.com/?devMode=true#/custom-apps/?localDevUrl=https://localhost:9080` in a browser and you should see the app screen.
   ![](images/app-screen-local.png)

### Test & Coverage

- The project has > 150 unit tests for each of the UI and runtime actions. You can run these test by running the following command from the project folder

  ```
  $ npm run test
  ```

- To Run a test coverage report run the following command from the project folder
  ```
  $ npm run test-coverage
  ```

### Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

---

## Project Folder Structure

```bash
├── actions  #this folder is intended for backend source code for all serverless actions
│   ├── misc
│   │   ├── get-aio-state.js # wrapper runtime action to get a state value from aio-lib-state
│   │   ├── update-aio-state.js # wrapper runtime action to set a state value from aio-lib-state
│   ├── ODE
│   │   ├── get-activities.js # action to get a list of all ODE activities in the AEP instance
│   │   ├── get-container.js # action to get the ODE container ID for the sandbox selected.
│   │   ├── get-decision-rules.js # action to get the details of Decision Rule.
│   │   ├── get-fallback-offer-details.js # action to get fallback offer meta data.
│   │   ├── get-offer-details.js # action to get offer meta data details.
│   │   ├── get-offer-metrics.js # action to get capping metrics for the offer.
│   │   ├── get-offer-representation.js # action to get the ODE container ID for the sandbox selected.
│   │   ├── get-placements.js # action to get the ODE container ID for the sandbox selected.
│   ├── PALM
│   │   ├── get-sandboxes.js # action to get a list of all sandboxes in the AEP instance
│   ├── UPS
│   │   ├── get-identity-namespaces.js # action to get list of all Identity Namespaces.
│   │   ├── get-identity-preview-report.js # action to get list of all populated Identity Namespaces.
│   │   ├── get-profile-experience-events.js # action to get experience events for the profile.
│   │   ├── get-profile.js # action to get Unified Profile based on an entity value lookup.
│   ├── utils.js
├── web-src   #this folder is intended for frontend source code such as html templates, react components, JS, CSS
│   ├── index.html
│   ├── src
│   │    ├── components
│   │    │    ├── About.js
│   │    │    ├── ActivityList.js  # React Component for Activity Picker.
│   │    │    ├── App.js
│   │    │    ├── EligibilityRuleDetails.js # React Component for displaying Eligibility Rule details.
│   │    │    ├── ExperienceEventsView.js # React Component for displaying Experience Event Data.
│   │    │    ├── FallbackOfferDetails.js # React Component for Fallback offer details.
│   │    │    ├── Home.js
│   │    │    ├── NamespaceList.js # React Component for Identity Namespace drop down.
│   │    │    ├── OfferDetails.js # React Component for displaying offer meta data details.
│   │    │    ├── OfferPropositionMetricView.js # React Component for displaying Capping metric bar.
│   │    │    ├── OfferRender.js   # React Component to Render Offer Content.
│   │    │    ├── PlacementList.js  # React Component for Placement drop down.
│   │    │    ├── Previewer.js  # React Component for the Previewer Page.
│   │    │    ├── ProfileView.js  # React Component for displaying Experience Event Data.
│   │    │    ├── PropositionHistoryView.js  # React Component to display Proposition History.
│   │    │    ├── SandboxPicker.js  # React Component for Sandbox Picker Ribbon.
│   │    │    ├── SideBar.js  # React Component for Side Bar.
│   │    ├── context
│   │    │    ├── ProfileViewContext.js # React Context for profile attributes in decision rules.
│   │    │    ├── UserSettingsContext.js # React Context for user settings for the app.
│   │    ├── hooks
│   │    │    ├── useActionWebInvoke.js # React Custom Hook for caching runtime action responses.
│   │    ├── exc-runtime.js
│   │    ├── index.css
│   │    ├── index.js
│   │    ├── utils.js
├── e2e  #this folder is intended for end-to-end tests
├── test  #this folder is intended for back-end action unit tests and integration tests
│   ├── actions # contains all unit tests for runtime actions.
│   ├── web-src # contains all unit tests for UI components.
├── manifest.yml #this file describes the backend actions you would like to deploy or to redeploy
├── README.md
├── package.json #this file describes project definition and various metadata relevant to the project.
└── .gitignore
```

---

## Config Files

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
  with your project name and version.
- For each action, use the `function` field to indicate the path to the action
  code.
- More documentation for supported action fields can be found
  [here](https://github.com/apache/incubator-openwhisk-wskdeploy/blob/master/specification/html/spec_actions.md#actions).

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
- Used State SDK to store dark mode setting.

  #### Bug Fixes

  - Updated profile data error message
  - Offer Metric Bar only displayed when metric has been created.

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
- Added offer capping metric Meter component to offer details.

## Features Requested

- Show sample profiles based on decision rule.
- Show proposition history events.
- Show lineage followed to make the offer decision.
- Show Decision API call.
- Add integration tests.
- Add better error handling.
- Document How to install the app on a new IMS org.
- Document how to use the App
