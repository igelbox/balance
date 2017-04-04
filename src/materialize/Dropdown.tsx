import * as React from 'react';
import * as $ from 'jquery';

import './Dropdown.scss';

export class Button extends React.Component<{
  constrainWidth: boolean,
  alignment: string,
  activates: string,
}, any> {
  element: HTMLAnchorElement;

  render() {
    return <a
      href="#"
      data-activates={this.props.activates}
      ref={(el) => { this.element = el; }}
    >
      {this.props.children}
    </a>;
  }

  componentDidMount() {
    $(this.element).dropdown({
      constrainWidth: this.props.constrainWidth,
      alignment: this.props.alignment,
    });
  }
}
