/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

//Errors
const BadRequest = {
  err: {
    throws: new Error("Bad Request"),
  },
  message: "Bad Request",
};
const UnauthorizedRequest = {
  err: {
    throws: new Error("Unauthorized"),
  },
  message: "Unauthorized",
};
const ForbiddenRequest = {
  err: {
    throws: new Error("Forbidden Request"),
  },
  message: "Forbidden Request",
};
const NotFound = {
  err: {
    throws: new Error("Not Found"),
  },
  message: "Not Found",
};
const InternalServerError = {
  err: {
    throws: new Error("Internal Server Error"),
  },
  message: "Internal Server Error",
};

//Data
const offerActivity = {
  containerId: "e0bd8463-0913-4ca1-bd84-6309134ca1f6",
  schemaNs:
    "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5",
  requestTime: "2020-10-21T22:38:32.838180Z",
  _embedded: {
    results: [
      {
        instanceId: "286f6f80-026b-11eb-9439-ad36e372cbf1",
        schemas: [
          "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5",
        ],
        productContexts: ["acp"],
        "repo:etag": 5,
        "repo:createdDate": "2020-09-29T15:48:02.808677Z",
        "repo:lastModifiedDate": "2020-10-15T15:49:26.673560Z",
        "repo:createdBy": "{CREATED_BY}",
        "repo:lastModifiedBy": "{MODIFIED_BY}",
        "repo:createdByClientId": "{CREATED_CLIENT_ID}",
        "repo:lastModifiedByClientId": "{MODIFIED_CLIENT_ID}",
        _instance: {
          "xdm:fallback": "xcore:fallback-offer:1233160780eaa2ef",
          "xdm:name": "A2: Cross Channel Activity",
          "xdm:endDate": "2020-10-09T07:00:00.000Z",
          "xdm:startDate": "2020-09-29T07:00:00.000Z",
          "xdm:status": "live",
          "xdm:criteria": [
            {
              "xdm:placements": ["xcore:offer-placement:122204529514a2c0"],
              "xdm:optionSelection": {
                "xdm:filter": "xcore:offer-filter:122a120f234dac7f",
              },
            },
            {
              "xdm:placements": ["xcore:offer-placement:122201b2150d98c2"],
              "xdm:optionSelection": {
                "xdm:filter": "xcore:offer-filter:1222058c3f0d98de",
              },
            },
          ],
          "@id": "xcore:offer-activity:12317fe6aeec9330",
        },
        _links: {
          self: {
            name:
              "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5#286f6f80-026b-11eb-9439-ad36e372cbf1",
            href:
              "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/instances/286f6f80-026b-11eb-9439-ad36e372cbf1",
            "@type":
              "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5",
          },
        },
        sandboxName: "ode-prod-va7-edge-testing",
      },
      {
        instanceId: "4e0206d0-0e6a-11eb-884a-c1a1104e3d7d",
        schemas: [
          "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5",
        ],
        productContexts: ["acp"],
        "repo:etag": 1,
        "repo:createdDate": "2020-10-14T22:12:10.300775Z",
        "repo:lastModifiedDate": "2020-10-14T22:12:10.300775Z",
        "repo:createdBy": "{CREATED_BY}",
        "repo:lastModifiedBy": "{MODIFIED_BY}",
        "repo:createdByClientId": "{CREATED_CLIENT_ID}",
        "repo:lastModifiedByClientId": "{MODIFIED_CLIENT_ID}",
        _instance: {
          "xdm:fallback": "xcore:fallback-offer:1233160780eaa2ef",
          "xdm:name": "LBAR",
          "xdm:endDate": "2021-02-28T08:00:00.000Z",
          "xdm:startDate": "2020-10-14T07:00:00.000Z",
          "xdm:status": "live",
          "xdm:criteria": [
            {
              "xdm:placements": ["xcore:offer-placement:122204529514a2c0"],
              "xdm:optionSelection": {
                "xdm:filter": "xcore:offer-filter:122a120f234dac7f",
              },
            },
          ],
          "@id": "xcore:offer-activity:124527ab00b2ebbc",
        },
        _links: {
          self: {
            name:
              "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5#4e0206d0-0e6a-11eb-884a-c1a1104e3d7d",
            href:
              "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/instances/4e0206d0-0e6a-11eb-884a-c1a1104e3d7d",
            "@type":
              "https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5",
          },
        },
        sandboxName: "ode-prod-va7-edge-testing",
      },
    ],
    total: 7,
    count: 2,
  },
  _links: {
    self: {
      href:
        "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/queries/core/search?schema=https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5&limit=2",
      "@type": "https://ns.adobe.com/experience/xcore/hal/results",
    },
    next: {
      href:
        "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/queries/core/search?start=4e0206d0-0e6a-11eb-884a-c1a1104e3d7d&orderby=instanceId&schema=https://ns.adobe.com/experience/offer-management/offer-activity;version=0.5&limit=2",
      "@type": "https://ns.adobe.com/experience/xcore/hal/results",
    },
  },
};

const container = {
  _embedded: {
    "https://ns.adobe.com/experience/xcore/container": [
      {
        instanceId: "8a4838ca-dc7c-31d8-9983-2fbb0c224f3a",
        schemas: [
          "https://ns.adobe.com/experience/xcore/container;version=0.5",
        ],
        productContexts: ["acp"],
        "repo:etag": 2,
        "repo:createdDate": "2020-11-06T20:39:36.218901Z",
        "repo:lastModifiedDate": "2020-12-15T17:12:41.707560Z",
        "repo:createdBy": "acp_provisioning@AdobeID",
        "repo:lastModifiedBy": "acp_core_omnihub_entities@AdobeID",
        "repo:createdByClientId": "acp_provisioning",
        "repo:lastModifiedByClientId": "acp_core_omnihub_entities",
        _instance: {
          containerType: "decisioning",
          "repo:name": "sandbox1 decisioning",
          dataCenter: "VA7",
          parentName: "sandbox1",
          parentId: "6108e7fd-549d-4384-88e7-fd549dd3847b",
        },
        _links: {
          self: {
            href: "/containers/8a4838ca-dc7c-31d8-9983-2fbb0c224f3a",
          },
        },
      },
    ],
  },
  _links: {
    self: {
      href: "/?product=acp&property=_instance.parentName==sandbox1",
      "@type": "https://ns.adobe.com/experience/xcore/hal/home",
    },
  },
};

const offerRepresentationError = {
  "xdm:propositionID": "6d0bdb6e-b63f-487e-9127-505222325b66",
  "status": 404,
  "detail":"fake-error-message",
  "ode:createDate": 1607364798809,
};

const offerRepresentationText = {
  "xdm:propositionID": "6d0bdb6e-b63f-487e-9127-505222325b66",
  "xdm:propositions": [
    {
      "xdm:activity": {
        "xdm:id": "xcore:offer-activity:1270a70dae03141b",
        "repo:etag": "1",
      },
      "xdm:placement": {
        "xdm:id": "xcore:offer-placement:126f7c4b8b9de6d4",
        "repo:etag": "7",
      },
      "xdm:options": [
        {
          "xdm:id": "xcore:personalized-offer:1270a49f6143140d",
          "repo:etag": "4",
          "xdm:characteristics": {
            product: "Auto",
          },
          "@type":
            "https://ns.adobe.com/experience/offer-management/content-component-text",
          "dc:format": "text/plain",
          "dc:language": ["en-us"],
          "xdm:content": "Ready for a new ride!!!",
        },
      ],
    },
  ],
  "xdm:factors": {
    "xdm:numberOfIneligibleOffers": "1",
  },
  "ode:createDate": 1607364798809,
};
const offerRepresentationImage = {
  "xdm:propositionID": "2347f8a4-ebf7-45ae-ac75-10d7d91497e1",
  "xdm:propositions": [
    {
      "xdm:activity": {
        "xdm:id": "xcore:offer-activity:122208b3a8740558",
        "repo:etag": "4",
      },
      "xdm:placement": {
        "xdm:id": "xcore:offer-placement:122204529514a2c0",
        "repo:etag": "3",
      },
      "xdm:options": [
        {
          "xdm:id": "xcore:personalized-offer:12331b9dc92aa2f6",
          "repo:etag": "7",
          "xdm:characteristics": {
            product: "savings",
            region: "NA",
          },
          "@type":
            "https://ns.adobe.com/experience/offer-management/content-component-imagelink",
          "dc:format": "image/jpeg",
          "xdm:deliveryURL":
            "https://d37yhxrr0p3l3l.cloudfront.net/0fd0f090-a148-11ea-89e3-f1f2ad52f7e8/urn:aaid:sc:US:a68c86a6-9295-4940-a083-11916b665500/0/40d78a12-f8b6-3f07-8e67-7cb8ae2cc7ec",
        },
      ],
    },
  ],
  "xdm:factors": {
    "xdm:numberOfIneligibleOffers": "2",
  },
  "ode:createDate": 1604011243807,
};

const offerPlacements = {
  containerId: "e0bd8463-0913-4ca1-bd84-6309134ca1f6",
  schemaNs:
    "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4",
  requestTime: "2020-10-21T19:48:51.843067Z",
  _embedded: {
    results: [
      {
        instanceId: "0feb6a80-0f32-11eb-8110-e17787c335b5",
        schemas: [
          "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4",
        ],
        productContexts: ["acp"],
        "repo:etag": 2,
        "repo:createdDate": "2020-10-15T22:02:05.480449Z",
        "repo:lastModifiedDate": "2020-10-15T22:13:00.278175Z",
        "repo:createdBy": "{CREATED_BY}",
        "repo:lastModifiedBy": "{MODIFIED_BY}",
        "repo:createdByClientId": "{CREATED_CLIENT_ID}",
        "repo:lastModifiedByClientId": "{MODIFIED_CLIENT_ID}",
        _instance: {
          "xdm:name": "New placement name",
          "xdm:componentType":
            "https://ns.adobe.com/experience/offer-management/content-component-html",
          "xdm:channel": "https://ns.adobe.com/xdm/channel-types/web",
          "xdm:description": "Updated placement description",
          "@id": "xcore:offer-placement:12466ef35fc5baa0",
        },
        _links: {
          self: {
            name:
              "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4#0feb6a80-0f32-11eb-8110-e17787c335b5",
            href:
              "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/instances/0feb6a80-0f32-11eb-8110-e17787c335b5",
            "@type":
              "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4",
          },
        },
      },
      {
        instanceId: "269192b0-f8f2-11ea-8723-916b9fbadc53",
        schemas: [
          "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4",
        ],
        productContexts: ["acp"],
        "repo:etag": 1,
        "repo:createdDate": "2020-09-17T14:29:10.107121Z",
        "repo:lastModifiedDate": "2020-09-17T14:29:10.107121Z",
        "repo:createdBy": "{CREATED_BY}",
        "repo:lastModifiedBy": "{MODIFIED_BY}",
        "repo:createdByClientId": "{CREATED_CLIENT_ID}",
        "repo:lastModifiedByClientId": "{MODIFIED_CLIENT_ID}",
        _instance: {
          "xdm:componentType":
            "https://ns.adobe.com/experience/offer-management/content-component-html",
          "xdm:name": "demo placement",
          "xdm:channel": "https://ns.adobe.com/xdm/channel-types/web",
          "@id": "xcore:offer-placement:1221fac4e7340521",
        },
        _links: {
          self: {
            name:
              "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4#269192b0-f8f2-11ea-8723-916b9fbadc53",
            href:
              "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/instances/269192b0-f8f2-11ea-8723-916b9fbadc53",
            "@type":
              "https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4",
          },
        },
        sandboxName: "ode-prod-va7-edge-testing",
      },
    ],
    total: 17,
    count: 2,
  },
  _links: {
    self: {
      href:
        "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/queries/core/search?schema=https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4&limit=2",
      "@type": "https://ns.adobe.com/experience/xcore/hal/results",
    },
    next: {
      href:
        "/e0bd8463-0913-4ca1-bd84-6309134ca1f6/queries/core/search?start=269192b0-f8f2-11ea-8723-916b9fbadc53&orderby=instanceId&schema=https://ns.adobe.com/experience/offer-management/offer-placement;version=0.4&limit=2",
      "@type": "https://ns.adobe.com/experience/xcore/hal/results",
    },
  },
};

const sandboxes = {
  sandboxes: [
    {
      name: "prod",
      title: "Prod",
      state: "active",
      type: "production",
      region: "VA7",
      isDefault: true,
      eTag: -686554744,
      createdDate: "2020-12-10 18:31:03",
      lastModifiedDate: "2020-12-10 18:31:03",
      createdBy: "acp_provisioning",
      lastModifiedBy: "acp_provisioning",
    },
    {
      name: "sandbox1",
      title: "Sandbox 1",
      state: "active",
      type: "development",
      region: "VA7",
      isDefault: false,
      eTag: 1459970834,
      createdDate: "2020-12-15 21:58:52",
      lastModifiedDate: "2020-12-15 21:58:52",
      createdBy: "7FDC1DB1597654FF0A495C19@AdobeID",
      lastModifiedBy: "7FDC1DB1597654FF0A495C19@AdobeID",
    },
  ],
  _page: {
    limit: 50,
    count: 2,
  },
  _links: {
    page: {
      href:
        "https://platform.adobe.io:443/data/foundation/sandbox-management/sandboxes?limit={limit}&offset={offset}",
      templated: true,
    },
  },
};
const identityNamespaces = [
  {
    updateTime: 1551688425455,
    code: "CORE",
    status: "ACTIVE",
    description: "Adobe Audience Manger UUID",
    id: 0,
    createTime: 1551688425455,
    idType: "COOKIE",
    namespaceType: "Standard",
    name: "CORE",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "ECID",
    status: "ACTIVE",
    description: "Adobe Experience Cloud ID",
    id: 4,
    createTime: 1551688425455,
    idType: "COOKIE",
    namespaceType: "Standard",
    name: "ECID",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "AdCloud",
    status: "ACTIVE",
    description: "Adobe AdCloud - ID Syncing Partner",
    id: 411,
    createTime: 1551688425455,
    idType: "COOKIE",
    namespaceType: "Standard",
    name: "AdCloud",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "Email_LC_SHA256",
    status: "ACTIVE",
    description:
      "Email addresses need to be hashed using SHA256 and lowercased. Please also note that leading and trailing spaces need to be trimmed before an email address is normalized. You won't be able to change this setting later",
    id: 11,
    createTime: 1551688425455,
    idType: "Email",
    namespaceType: "Standard",
    name: "Emails (SHA256, lowercased)",
    custom: false,
    hashFunction: "SHA256",
    transform: "lowercase",
  },
  {
    updateTime: 1597996054636,
    code: "Phone_E.164",
    status: "ACTIVE",
    description:
      "Namespace for raw phone numbers in E.164 format. + sign is required",
    id: 17,
    createTime: 1597996054636,
    idType: "Phone",
    namespaceType: "Standard",
    name: "Phone (E.164)",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "GAID",
    status: "ACTIVE",
    description: "This datasource is associated to a Google Ad ID",
    id: 20914,
    createTime: 1551688425455,
    idType: "DEVICE",
    namespaceType: "Standard",
    name: "Google Ad ID (GAID)",
    custom: false,
  },
  {
    updateTime: 1476993749000,
    code: "IDFA",
    status: "ACTIVE",
    description:
      "Apple ID for Advertisers. See: https://support.apple.com/en-us/HT202074 for more info.",
    id: 20915,
    createTime: 1476993749000,
    idType: "DEVICE",
    namespaceType: "Standard",
    name: "Apple IDFA (ID for Advertisers)",
    custom: false,
  },
  {
    updateTime: 1559600046005,
    code: "APNS",
    status: "ACTIVE",
    description: "Identities collected via Apple for Push notification Service",
    id: 20920,
    createTime: 1559600046005,
    idType: "DEVICE",
    namespaceType: "Standard",
    name: "Apple Push Notification service",
    custom: false,
  },
  {
    updateTime: 1559600061630,
    code: "FCM",
    status: "ACTIVE",
    description:
      "Identities collected via Google for Push notification Service",
    id: 20919,
    createTime: 1559600061630,
    idType: "DEVICE",
    namespaceType: "Standard",
    name: "Firebase Cloud Messaging",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "AAID",
    status: "ACTIVE",
    description: "Adobe Analytics (Legacy ID)",
    id: 10,
    createTime: 1551688425455,
    idType: "COOKIE",
    namespaceType: "Standard",
    name: "Adobe Analytics (Legacy ID)",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "Email",
    status: "ACTIVE",
    description: "Email",
    id: 6,
    createTime: 1551688425455,
    idType: "Email",
    namespaceType: "Standard",
    name: "Email",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "WAID",
    status: "ACTIVE",
    description: "Windows AID",
    id: 8,
    createTime: 1551688425455,
    idType: "DEVICE",
    namespaceType: "Standard",
    name: "Windows AID",
    custom: false,
  },
  {
    updateTime: 1551688425455,
    code: "TNTID",
    status: "ACTIVE",
    description: "Adobe Target (TNTID)",
    id: 9,
    createTime: 1551688425455,
    idType: "COOKIE",
    namespaceType: "Standard",
    name: "TNTID",
    custom: false,
  },
  {
    updateTime: 1556676459431,
    code: "Google",
    status: "ACTIVE",
    id: 771,
    createTime: 1556676459431,
    idType: "COOKIE",
    namespaceType: "Integration",
    name: "Google",
    custom: false,
  },
  {
    updateTime: 1570746432714,
    code: "AppNexus",
    status: "ACTIVE",
    description: "Namespace for ID Syncing with AppNexus",
    id: 358,
    createTime: 1570746432714,
    idType: "COOKIE",
    namespaceType: "Integration",
    name: "AppNexus",
    custom: false,
  },
  {
    updateTime: 1570746432714,
    code: "MicrosoftBing",
    status: "ACTIVE",
    description: "Namespace for ID Syncing with Microsoft Bing",
    id: 1957,
    createTime: 1570746432714,
    idType: "COOKIE",
    namespaceType: "Integration",
    name: "Microsoft Bing",
    custom: false,
  },
  {
    updateTime: 1570746432714,
    code: "TradeDesk",
    status: "ACTIVE",
    description: "Namespace for ID Syncing with TradeDesk",
    id: 903,
    createTime: 1570746432714,
    idType: "COOKIE",
    namespaceType: "Integration",
    name: "TradeDesk",
    custom: false,
  },
  {
    updateTime: 1570746432714,
    code: "MediaMath",
    status: "ACTIVE",
    description: "Namespace for ID Syncing with Media Math",
    id: 269,
    createTime: 1570746432714,
    idType: "COOKIE",
    namespaceType: "Integration",
    name: "Media Math",
    custom: false,
  },
  {
    updateTime: 1573151701250,
    code: "AAMSegments",
    status: "ACTIVE",
    description: "Namespace for Audience Manager segments",
    id: 13,
    createTime: 1573151701250,
    idType: "NON_PEOPLE",
    namespaceType: "Integration",
    name: "AAMSegment",
    custom: false,
  },
  {
    updateTime: 1573151701250,
    code: "AAMTraits",
    status: "ACTIVE",
    description: "Namespace for Audience Manager traits",
    id: 14,
    createTime: 1573151701250,
    idType: "NON_PEOPLE",
    namespaceType: "Integration",
    name: "AAMTrait",
    custom: false,
  },
  {
    updateTime: 1594189585349,
    code: "AEPSegments",
    status: "ACTIVE",
    description: "Namespace for AEP segments",
    id: 16,
    createTime: 1594189585349,
    idType: "NON_PEOPLE",
    namespaceType: "Integration",
    name: "AEPSegments",
    custom: false,
  },
  {
    updateTime: 1604597776019,
    code: "Phone_SHA256_E.164",
    status: "ACTIVE",
    description:
      "Phone numbers need to be hashed using SHA256 without any dashes. Hash should be completed by customers on raw phone numbers in E.164 format. Please note that some destinations may have different phone number formatting requirements. Refer to documentation or consult your Adobe representative",
    id: 18,
    createTime: 1604597776019,
    idType: "Phone",
    namespaceType: "Standard",
    name: "Phone (SHA256_E.164)",
    custom: false,
    hashFunction: "SHA256",
  },
  {
    updateTime: 1604597776019,
    code: "Phone_SHA256",
    status: "ACTIVE",
    description:
      "Remove symbols, letters, and any leading zeroes before hashing. Prefix the country code before hashing. Please note that some destinations may have different phone number formatting requirements. Refer to documentation or consult your Adobe representative",
    id: 15,
    createTime: 1597995750042,
    idType: "Phone",
    namespaceType: "Standard",
    name: "Phone (SHA256)",
    custom: false,
    hashFunction: "SHA256",
  },
  {
    updateTime: 1551688425455,
    code: "Phone",
    status: "ACTIVE",
    description: "Phone",
    id: 7,
    createTime: 1551688425455,
    idType: "PHONE_NUMBER",
    namespaceType: "Standard",
    name: "Phone",
    custom: false,
  },
  {
    updateTime: 1608069578646,
    code: "journey",
    status: "ACTIVE",
    description: "For journey / step event relationship",
    id: 10540836,
    createTime: 1608069578646,
    idType: "NON_PEOPLE",
    namespaceType: "Custom",
    name: "journey step event namespace",
    custom: true,
  },
];
const profile = {
  BVrqzwVv7o2p3naHvnsWpqZXv3KJgA: {
    entityId: "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA",
    sources: ["1000000000"],
    entity: {
      identities: [
        {
          id: "89149270342662559642753730269986316601",
          namespace: {
            code: "ecid",
          },
        },
        {
          id: "janedoe@example.com",
          namespace: {
            code: "email",
          },
        },
        {
          id: "janesmith@example.com",
          namespace: {
            code: "email",
          },
        },
        {
          id: "89149270342662559642753730269986316604",
          namespace: {
            code: "ecid",
          },
        },
        {
          id: "58832431024964181144308914570411162539",
          namespace: {
            code: "ecid",
          },
        },
        {
          id: "89149270342662559642753730269986316602",
          namespace: {
            code: "ecid",
          },
          primary: true,
        },
      ],
      person: {
        name: {
          firstName: "Jane",
          middleName: "F",
          lastName: "Doe",
        },
      },
      workEmail: {
        primary: true,
        address: "janedoe@example.com",
        label: "Jane Doe",
        type: "work",
        status: "active",
      },
    },
    lastModifiedAt: "2018-08-28T20:57:24Z",
  },
};

const identityPreviewReport = {
  data: [
    {
      sampleCount: 135628,
      samplePercentage: 0.934489,
      reportTimestamp: "2020-11-15T13:02:05.179",
      fullIDsFragmentCount: 7196312,
      fullIDsCount: 6777012,
      fullIDsPercentage: 0.934435,
      code: "ECID",
      value: "4",
    },
    {
      sampleCount: 9470,
      samplePercentage: 0.065249,
      reportTimestamp: "2020-11-15T13:02:05.179",
      fullIDsFragmentCount: 7290430,
      fullIDsCount: 6860299,
      fullIDsPercentage: 0.945919,
      code: "AAID",
      value: "10",
    },
    {
      sampleCount: 256,
      samplePercentage: 0.001764,
      reportTimestamp: "2020-11-15T13:02:05.179",
      fullIDsFragmentCount: 22729,
      fullIDsCount: 22723,
      fullIDsPercentage: 0.003133,
      code: "Email",
      value: "6",
    },
    {
      sampleCount: 1231,
      samplePercentage: 0.008482,
      reportTimestamp: "2020-11-15T13:02:05.179",
      fullIDsFragmentCount: 161100,
      fullIDsCount: 160166,
      fullIDsPercentage: 0.022084,
      code: "CRMID",
      value: "10179376",
    },
    {
      sampleCount: 60,
      samplePercentage: 0.000413,
      reportTimestamp: "2020-11-15T13:02:05.179",
      fullIDsFragmentCount: 15751,
      fullIDsCount: 15384,
      fullIDsPercentage: 0.002121,
      code: "CRMIDCombo",
      value: "10207836",
    },
  ],
  reportTimestamp: "2020-11-15T13:02:05.179",
};
const data = {
  offerActivity: offerActivity,
  container: container,
  offerRepresentationImage: offerRepresentationImage,
  offerRepresentationText: offerRepresentationText,
  offerRepresentationError: offerRepresentationError,
  offerPlacements: offerPlacements,
  sandboxes: sandboxes,
  identityNamespaces: identityNamespaces,
  profile: profile,
  identityPreviewReport: identityPreviewReport,
};

module.exports = {
  data: data,
  errors: {
    Bad_Request: BadRequest,
    Unauthorized_Request: UnauthorizedRequest,
    Forbidden_Request: ForbiddenRequest,
    Not_Found: NotFound,
    Internal_Server_Error: InternalServerError,
  },
};
