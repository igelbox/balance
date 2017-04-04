import * as React from 'react';
import * as $ from 'jquery';

export class Collapsible extends React.Component<any, any> {
  element: HTMLElement;

  render() {
    return <ul
      className="collapsible"
      ref={(el) => { this.element = el; }}
    >
      {this.props.children}
    </ul>;
  }

  componentDidMount() {
    $(this.element).collapsible();
  }
}
