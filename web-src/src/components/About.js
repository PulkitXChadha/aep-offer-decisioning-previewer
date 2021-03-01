/*
 * <license header>
 */

import React, { useState, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import { Heading, View, Content, Link } from "@adobe/react-spectrum";
export const About = () => {
  return (
    <View width="size-6000">
      <Heading level={1}>Useful documentation for your app</Heading>
      <ReactMarkdown source={text.markdown} />
      <Content>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Link>
              <a
                href="https://github.com/AdobeDocs/project-firefly/blob/master/README.md#project-firefly-developer-guide"
                target="_blank"
              >
                Firefly Apps
              </a>
            </Link>
          </li>
          <li>
            <Link>
              <a
                href="https://github.com/adobe/aio-sdk#adobeaio-sdk"
                target="_blank"
              >
                Adobe I/O SDK
              </a>
            </Link>
          </li>
          <li>
            <Link>
              <a
                href="https://adobedocs.github.io/adobeio-runtime/"
                target="_blank"
              >
                Adobe I/O Runtime
              </a>
            </Link>
          </li>
          <li>
            <Link>
              <a
                href="https://react-spectrum.adobe.com/react-spectrum/index.html"
                target="_blank"
              >
                React Spectrum
              </a>
            </Link>
          </li>
        </ul>
      </Content>
    </View>
  );
};
