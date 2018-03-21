import * as React from "react";

import Address from "@src/components/Address";
import Panels from "@src/components/Panels";
import { keyframes } from "emotion";
import styled from "react-emotion";

export interface ProcessProps {
  state: string;
  onOk: () => void;
}

const spin = keyframes`
  100% {
    transform: rotateZ(360deg);
  }
`;

const Spinner = styled("div")`
  animation ${spin} 0.8s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform-origin: center 52%;
  user-select: none;
`;

export default class Process extends React.Component<ProcessProps, {}> {
  public componentWillReceiveProps(nextProps: ProcessProps) {
    if (nextProps.state === "PROCESSED" && this.props.state === "WAIT") {
      this.props.onOk();
    }
  }

  public render() {
    return (
      <Panels
        left={<Spinner style={{ fontSize: "1000%" }}>⌛</Spinner>}
        right={
          <div>
            <h4>
              Registering via gateway at <code>{window.gatewayUrl}</code>&hellip;
            </h4>
          </div>
        }
      />
    );
  }
}
