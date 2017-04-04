import * as React from 'react';
import * as $ from 'jquery';

import { buildClassName } from '../utils';

import './Modal.scss';

export class Modal extends React.Component<{
  id: string,
  className?: string,
  fixedFooter?: boolean,
  bottomSheet?: boolean,
}, { ready: boolean }> {
  element: HTMLElement;

  constructor() {
    super();
    this.state = {
      ready: false,
    };
  }

  render() {
    return <div
      id={this.props.id}
      className={buildClassName({
        modal: true,
        modalFixedFooter: this.props.fixedFooter,
        bottomSheet: this.props.bottomSheet,
      }, this.props.className)}
      ref={(el) => { this.element = el; }}
    >
      {this.state.ready ? this.props.children : undefined}
    </div>;
  }

  componentDidMount() {
    $(this.element).modal({
      ready: () => {
        this.setState({
          ...this.state,
          ready: true,
        });
      },
    });
  }
}

