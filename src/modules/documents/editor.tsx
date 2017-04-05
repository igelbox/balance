import * as React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {ModuleComponent} from '../core'
import {IDocument} from './core'
import {Form} from './form'

const DATA: IDocument[] = [
    { id: '1', date: new Date(2016, 1, 2), hint: 'qwe', author: 'authorA', signed: true },
    { id: '2', date: new Date(2016, 5, 6), hint: '132', author: '?', signed: false },
    { id: '3', date: new Date(2016, 8, 14), author: 'кассир' },
];

interface IState {
    opened: IDocument;
}

export class Component extends ModuleComponent<any, IState> {
    static TITLE = 'documents';
    state: IState = {
        opened: null
    };

    render() {
        return <div>
            <Table
                selectable={false}
                >
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    >
                    <TableRow>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Advanced</TableHeaderColumn>
                        <TableHeaderColumn>Author</TableHeaderColumn>
                        <TableHeaderColumn style={{ textAlign: 'right' }}>Attributes</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    >
                    { DATA.map(d => <TableRow key={d.id}>
                        <TableRowColumn>
                            <IconButton
                                onTouchTap={this.handleOpenDocument.bind(this, d) }
                                ><ImageEdit/></IconButton>
                        </TableRowColumn>
                        <TableRowColumn>{ d.date.toLocaleDateString() }</TableRowColumn>
                        <TableRowColumn>{d.hint}</TableRowColumn>
                        <TableRowColumn>{d.author}</TableRowColumn>
                        <TableRowColumn
                            style={{ textAlign: 'right' }}
                            >
                            {d.signed ? <IconButton
                                ><ActionLockOutline/></IconButton> : undefined}
                        </TableRowColumn>
                    </TableRow>) }
                </TableBody>
            </Table>
            <Dialog
                title='Document'
                actions={<FlatButton
                    label='Close'
                    primary={true}
                    onTouchTap={this.handleCloseDocument.bind(this) }
                    />}
                modal={true}
                open={!!this.state.opened}
                >
                <Form
                    document={this.state.opened}
                    onChange={this.handleChangeDocument.bind(this) }
                    />
            </Dialog>
        </div>;
    }

    handleOpenDocument(doc: IDocument) {
        this.setState({
            opened: doc
        });
    }

    handleChangeDocument(pn: string, pv: any) {
        this.setState({
            opened: Object.assign({}, this.state.opened, {
                [pn]: pv
            })
        });
    }

    handleCloseDocument() {
        this.setState({
            opened: null
        });
    }
}
