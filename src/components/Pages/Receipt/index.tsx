import * as React from "react";

import QRCode from "qrcode-react";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import Nav from "@src/containers/Nav";
import { Steps } from "@src/types";

export interface ReceiptProps {
  onGotoStep: (step: number) => void;
  hash: string;
  owner: string;
  blockid: string;
  txid: string;
}

export default class Receipt extends React.Component<ReceiptProps, {}> {
  public render() {
    return (
      <div>
        {this.props.txid ? (
          <Panels
            left={
              <div>
                <h4>Content hash</h4>
                <Address address={this.props.hash} lines={2} />
                <h4>Owner</h4>
                <div style={{ fontFamily: "monospace" }}>
                  {this.props.owner}
                </div>
                <h4>Block ID</h4>
                <Address address={this.props.blockid} lines={2} />
                <h4>Transaction ID</h4>
                <Address address={this.props.txid} lines={2} />
              </div>
            }
            right={
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <QRCode size={256} value={this.props.hash} />
              </div>
            }
          />
        ) : (
          <div>
            {this.props.hash ? (
              <>
                <p>
                  Failed to register. Content might have been registered
                  previously.
                </p>
                <Address address={this.props.hash} />
              </>
            ) : (
              <p>No transaction has been made.</p>
            )}
            <a href="#" onClick={() => this.props.onGotoStep(Steps.VERIFY)}>
              Check registry
            </a>, or&nbsp;
            <a href="#" onClick={() => this.props.onGotoStep(Steps.UPLOAD)}>
              upload a different file
            </a>
          </div>
        )}
        <Nav showPrev={false} showNext={this.props.txid != null} />
      </div>
    );
  }
}
