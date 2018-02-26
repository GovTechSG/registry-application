import * as React from "react";
import styled from "react-emotion";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import Preview from "@src/components/Preview";

export interface NavProps {
  onGotoStep: (step: number) => {};
  onNext?: (...args: any[]) => void;
  onPrev?: (...args: any[]) => void;
  step: number;
  canPrev?: boolean;
  canNext?: boolean;
  showPrev?: boolean;
  showNext?: boolean;
}

const StyledButton = styled("button")`
  padding: var(--m-m) var(--m-l);
  font-size: 150%;
  background-color: var(--gray-30);
  border-radius: var(--curve);
  border: 0;

  &.next:enabled {
    &:hover {
      background-color: var(--blue-50);
    }

    &:active {
      background-color: var(--blue-60);
    }

    color: white;
    background-color: var(--blue-40);
  }
`;

export default class Nav extends React.Component<NavProps, {}> {
  public static defaultProps: Partial<NavProps> = {
    canNext: true,
    canPrev: true,
    // tslint:disable-next-line:no-empty
    onNext: () => {},
    // tslint:disable-next-line:no-empty
    onPrev: () => {},
    showNext: true,
    showPrev: true
  };

  public render() {
    return (
      <div style={{ display: "flex", marginTop: "var(--m-l)" }}>
        {this.props.showPrev ? (
          <StyledButton
            className="prev"
            onClick={e => {
              this.props.onPrev(e);
              this.props.onGotoStep(this.props.step - 1);
            }}
            disabled={!this.props.canPrev}
            style={{ margin: "0 auto 0 0" }}
          >
            Previous
          </StyledButton>
        ) : null}

        {this.props.showNext ? (
          <StyledButton
            className="next"
            onClick={e => {
              this.props.onNext(e);
              this.props.onGotoStep(this.props.step + 1);
            }}
            disabled={!this.props.canNext}
            style={{ margin: "0 0 0 auto" }}
          >
            Next
          </StyledButton>
        ) : null}
      </div>
    );
  }
}
