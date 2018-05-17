import React from 'react';

export class Week extends React.Component {
  render() {
    return React.createElement('span', null, this.props.number);
  }
}

Week.defaultProps = {
	number: 7
}  