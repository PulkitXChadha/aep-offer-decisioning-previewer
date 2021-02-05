import React from "react";
import PropTypes from "prop-types";
import {
  Content,
  ProgressCircle,
  IllustratedMessage,
  Heading,
  Meter,
  Text,
} from "@adobe/react-spectrum";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

import Error from "@spectrum-icons/illustrations/Error";

const OfferPropositionMetricView = (props) => {
  if (!props.offerGlobalCap) {
    return null;
  } else {
    let headers = {};
    if (props.ims.token && !headers.authorization) {
      headers.authorization = `Bearer ${props.ims.token}`;
    }
    if (props.ims.org && !headers["x-gw-ims-org-id"]) {
      headers["x-gw-ims-org-id"] = props.ims.org;
    }

    const offerMetrics = useActionWebInvoke({
      actionName: "get-offer-metrics",
      headers: headers,
      params: {
        containerID: props.containerID,
        offerID: props.offerID,
        metric:
          "https://ns.adobe.com/experience/offer-management/offer-propositions",
      },
      cacheResponse: false,
    });
    let content = (
      <ProgressCircle
        id="offer-metric-details-progress-circle"
        aria-label="Getting Offer Proposition Metrics"
        isIndeterminate
        isHidden={!offerMetrics.isLoading}
        marginStart="size-100"
      />
    );

    if (!offerMetrics.isLoading && offerMetrics.error) {
      content = null;
    }
    if (!offerMetrics.data && !offerMetrics.error && !offerMetrics.isLoading) {
      content = <Text>Metrics not Found</Text>;
    }
    if (!offerMetrics.isLoading && offerMetrics.data) {
      const used =
        offerMetrics.data["xdm:metrics"][
          "https://ns.adobe.com/experience/offer-management/offer-propositions"
        ]["xdm:value"];

      const usagePercentage =
        (parseInt(used) * 100) / parseInt(props.offerGlobalCap);
      content = (
        <Meter
          label="Usage"
          marginBottom="size-300"
          value={usagePercentage}
          labelPosition="side"
          valueLabel={`${used} of ${props.offerGlobalCap}`}
          variant={
            usagePercentage <= 33
              ? "positive"
              : usagePercentage <= 66
              ? "warning"
              : "critical"
          }
        />
      );
    }
    return content;
  }
};

OfferPropositionMetricView.propTypes = {
  offer: PropTypes.any,
};

export default OfferPropositionMetricView;
