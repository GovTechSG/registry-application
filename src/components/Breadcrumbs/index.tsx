import * as React from "react";
import styled from "react-emotion";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import Preview from "@src/components/Preview";
import { Steps } from "@src/types";

export interface BreadcrumbsProps {
  currentStep: number;
  onGotoStep: (step: number) => void;
}

interface BreadcrumbProps {
  label: string;
  forStep: number;
  currentStep: number;
  clickable?: boolean;
  onGotoStep: (step: number) => void;
}

const StyledBreadcrumb = styled<BreadcrumbProps, "div">("div")`
  padding: var(--m-m);
  color: ${(props: BreadcrumbProps) =>
    props.forStep === props.currentStep ? "white" : "unset"}
  background-color: ${(props: BreadcrumbProps) => {
    if (props.forStep === props.currentStep) {
      return "var(--blue-40)";
    }

    if (props.currentStep > props.forStep) {
      return "var(--gray-40)";
    }

    return "transparent";
  }};
  cursor: ${props => (props.clickable ? "pointer" : "default")};
  opacity: ${props =>
    props.forStep === props.currentStep || props.clickable ? 1 : 0.5}
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  user-select: none;
`;

export class Breadcrumb extends React.Component<BreadcrumbProps, {}> {
  public static defaultProps: Partial<BreadcrumbProps> = {
    clickable: true
  };

  public render() {
    return (
      <StyledBreadcrumb
        {...this.props}
        onClick={() => {
          if (this.props.clickable) {
            this.props.onGotoStep(this.props.forStep);
          }
        }}
      >
        {this.props.label}
      </StyledBreadcrumb>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
export default class Breadcrumbs extends React.Component<BreadcrumbsProps, {}> {
  public render() {
    const step = this.props.currentStep;

    const isClickable = {
      [Steps.UPLOAD]: step !== 1 && step !== 4,
      [Steps.REGISTER]: step === 3,
      [Steps.PAY]: false,
      [Steps.PROCESS]: false,
      [Steps.RECEIPT]: step > 5,
      [Steps.VERIFY]: true
    };

    return (
      <div style={{ display: "flex", width: "100%" }}>
        <Breadcrumb
          {...this.props}
          forStep={Steps.UPLOAD}
          clickable={isClickable[Steps.UPLOAD]}
          label="Upload"
        />
        <Breadcrumb
          {...this.props}
          forStep={Steps.REGISTER}
          clickable={isClickable[Steps.REGISTER]}
          label="Register"
        />
        <Breadcrumb
          {...this.props}
          forStep={Steps.PAY}
          clickable={isClickable[Steps.PAY]}
          label="Pay"
        />
        <Breadcrumb
          {...this.props}
          forStep={Steps.PROCESS}
          clickable={isClickable[Steps.PROCESS]}
          label="Processing"
        />
        <Breadcrumb
          {...this.props}
          forStep={Steps.RECEIPT}
          clickable={isClickable[Steps.RECEIPT]}
          label="Receipt"
        />
        <Breadcrumb
          {...this.props}
          forStep={Steps.VERIFY}
          clickable={isClickable[Steps.VERIFY]}
          label="Verify"
        />
      </div>
    );
  }
}
