import * as React from "react";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import Preview from "@src/components/Preview";
import Nav from "@src/containers/Nav";

export interface RegisterProps {
  onSetOwner: (owner: string) => {};
  hash: string;
  owner: string;
  preview: any;
}

export default class Register extends React.Component<RegisterProps, {}> {
  public render() {
    return (
      <div>
        <Panels
          left={<Preview preview={this.props.preview} />}
          right={
            <div>
              <h4>Content hash</h4>
              <Address address={this.props.hash} />

              <h4>Register this to</h4>
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="did:foo:bar"
                value={this.props.owner}
                onChange={e => this.props.onSetOwner(e.currentTarget.value)}
                required
                autoFocus
              />
            </div>
          }
        />
        {/* TODO: hook up to owner */}
        <Nav canNext={this.props.owner != null && this.props.owner !== ""} />
      </div>
    );
  }
}
