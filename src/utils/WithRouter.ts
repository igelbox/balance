import ReactRouter from 'react-router';
import * as React from 'react';

export function WithRouter(target: any) {
    target.contextTypes = target.contextTypes || {};
    target.contextTypes.router = React.PropTypes.object.isRequired;
}

export interface IRouterContext {
    router: any;
}
