import * as React from 'react';

import {ModuleComponent} from '../core'
import {IDocument} from './core'
import {Form} from './form'

export class Editor extends ModuleComponent<IDocument, any> {
    static TITLE = 'Документ';
    constructor() {
        super()
    }
    render() {
        return <Form
            document={this.props.value}
            onChange={this.handleChangeDocument.bind(this) }
            />
    }

    handleChangeDocument(pn: string, pv: any) {
        this.props.onChange(Object.assign({}, this.props.value, {
            [pn]: pv
        }));
    }
}
