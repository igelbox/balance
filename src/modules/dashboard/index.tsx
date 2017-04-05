import * as React from 'react';
//import {Action, Store} from 'redux';
//import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import {ModuleComponent} from '../core'

//interface IState {
//    counter: number;
//}
//
//export function reducer(state: IState = { counter: 0 }, action: Action) {
//    return Object.assign({}, state, {
//        counter: state.counter + 1
//    });
//}

export class Component extends ModuleComponent<number, any> {
    static TITLE = 'dashboard';
    private timer: number;

    componentDidMount() {
        if (this.props.onChange)
            this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        if (this.timer)
            clearInterval(this.timer);
    }

    tick() {
        this.props.onChange(this.props.value + 1);
    }

    render() {
        return <RaisedButton
            label={ String(this.props.value) }
            disabled={ !this.props.onChange }
            onClick={ this.tick.bind(this) }
            />;
    }
}
//export let Component = connect((state: any) => state.dashboard)(ComponentImpl);
