import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {ModuleComponent} from '../core'

interface IState {
    counter: number;
}

export class Component extends ModuleComponent<any, IState> {
    static TITLE = 'dashboard';
    private timer: number;
    state: IState = {
        counter: 0
    };

    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        return <RaisedButton label={String(this.state.counter)}/>;
    }
}
