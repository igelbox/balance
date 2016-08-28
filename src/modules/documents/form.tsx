import * as React from 'react';
import TextField from 'material-ui/TextField';

import {IDocument} from './core'

interface IFormProps {
    document: IDocument;
    num?: number;
    onChange: (pn: string, val: any) => {}
}

interface IFormState {
    date: Date;
    time: Date;
}

function n2zs(n: number, l: number): string {
    let result = String(n);
    while (result.length < l)
        result = '0' + result;
    return result;
}

function dateTime2dateValue(dt: Date) {
    if (!dt)
        return '';
    return n2zs(dt.getFullYear(), 4) + '-' + n2zs(dt.getMonth() + 1, 2) + '-' + n2zs(dt.getDate(), 2);
}

function dateTime2timeValue(dt: Date) {
    if (!dt)
        return '';
    //console.log('g', dt, dt.getHours());
    return n2zs(dt.getHours(), 2) + ':' + n2zs(dt.getMinutes(), 2);
}

export class Form extends React.Component<IFormProps, IFormState> {
    //            {String(this.props.num)}
    componentWillMount() {
        this.setState({
            date: this.props.document.date,
            time: this.props.document.date
        })
    }

    componentWillReceiveProps(nextProps: IFormProps, nextContext: any) {
        this.setState({
            date: nextProps.document.date,
            time: nextProps.document.date
        })
    }

    render() {
        return <form>
            <TextField
                type='date'
                className={this.state.date ? '' : 'null'}
                floatingLabelText='Date'
//                floatingLabelFixed={true}
                value={ dateTime2dateValue(this.state.date) }
                onChange={ this.handleChangeDateTime.bind(this, 'date') }
                onBlur={ this.handleChangedDateTime.bind(this) }
                />
            <TextField
                type='time'
                className={this.state.date ? '' : 'null'}
//                floatingLabelFixed={true}
                floatingLabelText='Time'
                value={ dateTime2timeValue(this.state.time) }
                onChange={ this.handleChangeDateTime.bind(this, 'time') }
                onBlur={ this.handleChangedDateTime.bind(this) }
                />
            <TextField
                floatingLabelText='Hint'
                value={this.props.document.hint}
                onChange={ this.handleChange.bind(this, 'hint') }
                fullWidth={true}
                />
        </form>
    }

    private handleChangeDateTime(fname: string, event: any) {
        let nv: Date = event.target.valueAsDate;
        //console.log('sx', nv, nv.getUTCFullYear(), nv.getFullYear());
        if (nv) {
            let fy = nv.getUTCFullYear();
            nv = new Date(fy, nv.getUTCMonth(), nv.getUTCDate(), nv.getUTCHours(), nv.getUTCMinutes());
            nv.setFullYear(fy);
        }
        this.setState(Object.assign({}, this.state, {
            [fname]: nv
        }));
    }

    private handleChangedDateTime() {
        let dv = this.state.date;
        if (dv) {
            let tv = this.state.time;
            //console.log('s', tv, tv.getHours());
            if (tv) {
                dv = new Date(dv.getTime());
                dv.setHours(tv.getHours(), tv.getMinutes(), 0, 0);
            } else
                dv.setHours(0, 0, 0, 0);
        }
        this.props.onChange('date', dv);
    }

    private handleChange(fname: string, event: any) {
        this.props.onChange(fname, event.target.value);
    }
}
