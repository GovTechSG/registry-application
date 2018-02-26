import * as React from "react";
import styled from "react-emotion";

import Panels from "@src/components/Panels";
import Nav from "@src/containers/Nav";
import Preview from "@src/containers/Preview";

const StyledLabel = styled("label")`
  display: flex;
  flex-direction: column;
  margin-top: var(--m-m);

  input {
    margin-left: calc(-1 * var(--m-s));
  }
`;

export interface PayProps {
  hash: string;
  owner: string;
  onPayment: (hash: string, owner: string) => {};
}

const monospace = {
  fontFamily: "monospace"
};

export default class Pay extends React.Component<PayProps, {}> {
  public render() {
    return (
      <div>
        <Panels
          left={
            <div>
              <h4>Fees</h4>
              <div>Admin charge &mdash; 15.00 SGD</div>
            </div>
          }
          right={
            <div>
              <h4>By credit card</h4>

              <form style={{ display: "flex", flexDirection: "column" }}>
                <StyledLabel>
                  <div>Name on card</div>
                  <input
                    type="text"
                    readOnly
                    value="Tan Ah Kow"
                    style={{ width: "100%" }}
                  />
                </StyledLabel>

                <div style={{ display: "flex" }}>
                  <StyledLabel style={{ flex: 1 }}>
                    <div>Credit card number</div>
                    <input
                      type="text"
                      readOnly
                      value="💳 5105105105105100"
                      style={monospace}
                    />
                  </StyledLabel>

                  <StyledLabel
                    style={{
                      marginLeft: "var(--m-m)",
                      marginRight: "var(--m-l)"
                    }}
                  >
                    <div>CVV</div>
                    <div>
                      <input
                        type="text"
                        readOnly
                        value="123"
                        size={3}
                        style={monospace}
                      />
                    </div>
                  </StyledLabel>

                  <StyledLabel style={{ display: "flex", marginRight: "0" }}>
                    <div>Expiry</div>
                    <div style={{ display: "flex" }}>
                      <input
                        style={monospace}
                        readOnly
                        type="text"
                        value="02"
                        placeholder="MM"
                        size={2}
                      />
                      <input
                        style={monospace}
                        readOnly
                        type="text"
                        value="18"
                        placeholder="YY"
                        size={2}
                      />
                    </div>
                  </StyledLabel>
                </div>
              </form>
            </div>
          }
        />
        <Nav
          onNext={() => {
            this.props.onPayment(this.props.hash, this.props.owner);
          }}
        />
      </div>
    );
  }
}
