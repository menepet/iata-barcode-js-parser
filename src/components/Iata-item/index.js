import React from 'react';

class IataItem extends React.Component {

  render() {
    return (
      <li className={ this.props.item.isTitle ? 'title' : '' }>
          {this.props.item.key}: {this.props.item.value}
      </li>
    )
  }
}

export default IataItem;
