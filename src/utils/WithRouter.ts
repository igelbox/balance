import * as React from 'react';
import ReactRouter from 'react-router';

export function WithRouter<P>(target: React.ComponentClass<P>) {
    target.contextTypes = target.contextTypes || {};
    target.contextTypes['router'] = React.PropTypes.object.isRequired;
//    target.propTypes['params'] = React.PropTypes.object.isRequired;
}

export interface IRouterContext {
    router: any;
}
