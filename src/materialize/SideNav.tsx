import * as React from 'react';
import * as $ from 'jquery';

export class SideNavButton extends React.Component<any, any> {
  element: HTMLElement;

  render() {
    return <a
      href="#"
      data-activates="mobile-demo"
      ref={(el) => { this.element = el; }}
    >
      {this.props.children}
    </a>;
  }

  componentDidMount() {
    $(this.element).sideNav();
  }
}
