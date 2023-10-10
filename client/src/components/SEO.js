import React from "react";
import { Helmet } from "react-helmet-async";

export const SEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
