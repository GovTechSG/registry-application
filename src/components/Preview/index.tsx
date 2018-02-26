import * as React from "react";

export interface PreviewProps {
  preview: any;
}

export default class Preview extends React.Component<PreviewProps, {}> {
  public render() {
    return this.props.preview == null ? (
      <div
        style={{
          MozUserSelect: "none",
          WebkitUserSelect: "none",
          alignItems: "center",
          display: "flex",
          filter: "saturate(0)",
          fontSize: "500%",
          height: "100%",
          justifyContent: "center",
          msUserSelect: "none",
          opacity: 0.1,
          width: "100%"
        }}
      >
        💾
      </div>
    ) : (
      <video
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        autoPlay
        loop
        poster={this.props.preview}
        src={this.props.preview}
      />
    );
  }
}
