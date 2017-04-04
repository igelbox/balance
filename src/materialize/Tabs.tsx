import * as React from 'react';
import * as $ from 'jquery';

import { buildClassName } from '../utils';

export class Tab extends React.Component<{
  className?: string,
  active?: boolean,
  href: string,
}, any> {
  render() {
    return <li className="tab">
      <a
        className={buildClassName({
          active: this.props.active,
          wavesEffect: true,
          wavesLight: true,
        }, this.props.className)}
        href={this.props.href}
      >
        {this.props.children}
      </a>
    </li>;
  }
}

export class Tabs extends React.Component<{
  transparent?: boolean,
  fixedWidth?: boolean,
}, any> {
  element: HTMLElement;

  render() {
    return <ul
      className={buildClassName({
        tabs: true,
        tabsTransparent: this.props.transparent,
        tabsFixedWidth: this.props.fixedWidth,
      })}
      ref={(el) => { this.element = el; }}
    >
      {this.props.children}
    </ul>;
  }

  componentDidMount() {
    $(this.element).tabs();
  }
}
