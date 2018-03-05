import * as React from "react";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import Preview from "@src/components/Preview";
import Nav from "@src/containers/Nav";

const css = require("./styles.legacy.css");

export interface UploadProps {
  onLoadFile: (target: any) => {};
  preview: any;
}

export default class Upload extends React.Component<UploadProps, {}> {
  private input: HTMLInputElement;

  public render() {
    return (
      <div>
        <Panels
          left={
            <div
              className="dropper"
              style={{
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                alignItems: "center",
                backgroundClip: "border-box",
                backgroundColor: "rgb(235, 235, 235)",
                border: "dashed 3px grey",
                borderRadius: "var(--curve)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                width: "100%"
              }}
              onDragOver={e => {
                e.preventDefault();
              }}
              onDrop={e => {
                e.preventDefault();
                this.props.onLoadFile(e.dataTransfer);
              }}
              onClick={e => {
                this.input.click();
              }}
            >
              <div style={{ textAlign: "center", pointerEvents: "none" }}>
                <div style={{ fontSize: "500%" }}>⬆</div>
                <div>Upload file&hellip;</div>
              </div>
              <input
                id="upload-file"
                type="file"
                ref={el => {
                  this.input = el;
                }}
                style={{ display: "none" }}
                onChange={e => {
                  this.props.onLoadFile(e.target);
                }}
              />
            </div>
          }
          right={<Preview preview={this.props.preview} />}
        />

        <Nav showPrev={false} canNext={this.props.preview != null} />
      </div>
    );
  }
}
