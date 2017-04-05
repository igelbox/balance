import * as React from 'react';
import {Action, Store} from 'redux';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import {ModuleComponent} from '../core'

interface IState {
    counter: number;
}

export function reducer(state: IState = { counter: 0 }, action: Action) {
    return Object.assign({}, state, {
        counter: state.counter + 1
    });
}

class ComponentImpl extends ModuleComponent<IState & Store<any>, any> {
    static TITLE = 'dashboard';
    private timer: number;

    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.props.dispatch({type: 'inc'});
    }

    render() {
        return <RaisedButton
            label={String(this.props.counter) }
            onClick={this.props.dispatch.bind(this.props, {type: 'inc'})}
            />;
    }
}
export let Component = connect((state: any) => state.dashboard)(ComponentImpl);
