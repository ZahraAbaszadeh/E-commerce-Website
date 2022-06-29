import React from "react";
import { Helmet } from "react-helmet";
import { AppRouting } from "./routes/indexRoutes";
export const App = (props) => {
  const appTitle = getAppTitle();
  const appDescription = getAppDescription();

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
        <meta name="description" content={appDescription} />
        <meta property="og:title" content={appTitle} />
        <meta property="og:description" content={appDescription} />
      </Helmet>
      <AppRouting />
    </>
  );
};
