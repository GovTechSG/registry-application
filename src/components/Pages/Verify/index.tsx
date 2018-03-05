import * as React from "react";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import { Contracts } from "@src/contracts";

export interface VerifyProps {
  onGetAccount: () => void;
  onRegisterSubject: (subject: string, account: string) => void;
  onRetrieveSubject: (subject: string) => void;
  account: string;
  subject: string;
  subjectOwner: string;
}

export default class Verify extends React.Component<VerifyProps, {}> {
  private subjectField: HTMLInputElement;
  private retrieveSubjectField: HTMLInputElement;

  public componentDidMount() {
    this.props.onGetAccount();
  }

  public render() {
    return (
      <Panels
        left={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Content hash</label>

            <div style={{ width: "100%", display: "flex" }}>
              <input
                style={{
                  flex: 1,
                  fontFamily: "monospace",
                  marginLeft: "calc(-1 * var(--m-s))"
                }}
                type="text"
                placeholder="eg. f255…"
                ref={i => {
                  this.retrieveSubjectField = i;
                }}
              />
              <button
                style={{ height: "100%" }}
                onClick={() =>
                  this.props.onRetrieveSubject(this.retrieveSubjectField.value)
                }
              >
                🔎
              </button>
            </div>
          </div>
        }
        right={
          <div>
            <label>Contract address</label>
            <Address address={Contracts.Registry.address} />

            <br />

            <label>Content hash</label>
            <div>
              {<Address address={this.props.subject || "?"} lines={2} />}
            </div>

            <br />

            <label>Owner</label>
            <div style={{ fontFamily: "monospace" }}>
              {this.props.subjectOwner || "?"}
            </div>
          </div>
        }
      />
    );
  }
}
