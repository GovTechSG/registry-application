import * as React from "react";

import Address from "@src/components/Address";

export interface PanelsProps {
  left?: JSX.Element;
  right?: JSX.Element;
}

export default class Panels extends React.Component<PanelsProps, {}> {
  public render() {
    return (
      <div
        style={{
          boxShadow: "var(--shadow-30)",
          display: "flex",
          justifyContent: "center",
          minHeight: "500px"
        }}
      >
        <div
          style={{
            margin: "var(--m-l) var(--m-m) var(--m-l) var(--m-l)",
            width: "50%"
          }}
        >
          {this.props.left}
        </div>
        <div
          style={{
            margin: "var(--m-l) var(--m-l) var(--m-l) var(--m-m)",
            width: "50%"
          }}
        >
          {this.props.right}
        </div>
      </div>
    );
  }
}
