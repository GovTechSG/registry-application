import * as React from "react";

import { css } from "emotion";
import styled from "react-emotion";

export const address = css`
  font-family: monospace;
  transition: color 0.1s ease-in;
`;

export const copy = css`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    filter: brightness(150%);
  }
`;

// TODO: validation, use direct address hash instead of toHashCode
export default class Address extends React.Component<
  { address: string; copy?: boolean; lines?: number },
  {}
> {
  public static defaultProps = {
    copy: true,
    lines: 1
  };

  public render() {
    if (!this.props.address) {
      return <div>Unknown {this.props.address}</div>;
    }

    function chunkString(str, size = 99999) {
      if (!str) {
        return [];
      }

      if (str.length === 1) {
        return [str];
      }

      const re = new RegExp(".{1," + size + "}", "g");
      return str.match(re);
    }

    const lineLength = Math.floor(this.props.address.length / this.props.lines);
    const chunks = chunkString(this.props.address, lineLength);

    return (
      <div
        className={[address, this.props.copy ? copy : ""].join(" ")}
        style={{
          color: this.color(this.props.address),
          wordBreak: "break-all"
        }}
        onClick={
          this.props.copy
            ? () => this.copyToClipboard(this.props.address)
            : null
        }
      >
        {chunks.map(c => <div key={c}>{c}</div>)}
      </div>
    );
  }

  private copyToClipboard(content) {
    const textField = document.createElement("textarea");
    textField.innerText = content;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }

  private color(addr: string) {
    return `hsl(${Math.abs(this.toHashCode(addr) % 360)}, 90%, 40%)`;
  }

  private toHashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      // tslint:disable-next-line:no-bitwise
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}
