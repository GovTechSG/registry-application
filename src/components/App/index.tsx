import { ThemeProvider } from "emotion-theming";
import * as React from "react";
import styled, { keyframes } from "react-emotion";
import { Link, Route, Switch } from "react-router-dom";

// import Echo from "@src/components/Echo";
import Breadcrumbs from "@src/containers/Breadcrumbs";

import Pay from "@src/containers/Pay";
import Process from "@src/containers/Process";
import Receipt from "@src/containers/Receipt";
import Register from "@src/containers/Register";
import Upload from "@src/containers/Upload";
import Verify from "@src/containers/Verify";

import { Steps } from "@src/types";

// Legacy CSS are supported
const legacyCss = require("./styles.legacy.css");

const Pages = {
  [Steps.UPLOAD]: <Upload />,
  [Steps.REGISTER]: <Register />,
  [Steps.PAY]: <Pay />,
  [Steps.PROCESS]: <Process />,
  [Steps.RECEIPT]: <Receipt />,
  [Steps.VERIFY]: <Verify />
};

export interface AppProps {
  step: Steps;
  onGotoStep: (step: Steps) => {};
}

export default class App extends React.Component<AppProps, {}> {
  public render() {
    return (
      <div
        className="app"
        style={{
          margin: "0 auto",
          maxWidth: "calc(var(--m) * 240)"
        }}
      >
        <h1>
          <div
            style={{
              fontFamily: "Georgia",
              fontVariantCaps: "small-caps",
              paddingTop: "var(--m-l)",
              textAlign: "left"
            }}
          >
            Depository
          </div>
          <div
            style={{ fontSize: "1rem", marginLeft: "2px" }}
            title="Specify gateway with `gateway` URL paramater"
          >
            @ {window.gatewayUrl}
          </div>
        </h1>

        <div style={{ marginBottom: "var(--m-l)" }}>
          <Breadcrumbs />
        </div>

        {Pages[this.props.step]}
      </div>
    );
  }
}
