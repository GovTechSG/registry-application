// @flow

import React from 'react';
import PropTypes from 'prop-types';

export default class Counter extends React.Component {
  render() {
    return (
      <div>
        <div className="value">{this.props.value}</div>
        <button className="increment" onClick={this.props.onIncrementClick}>INCREMENT</button>
        <button className="decrement" onClick={this.props.onDecrementClick}>DECREMENT</button>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
};
