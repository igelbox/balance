import * as React from 'react';

interface IState {
    counter: number;
}

export class App extends React.Component<any, IState> {
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
        return <div>Counter: {this.state.counter}</div>;
    }
}
