import * as React from 'react';

import {ModuleComponent} from '../core'

export class Component extends ModuleComponent<any, any> {
    static TITLE = 'documents';

    render() {
        return <span>documents</span>;
    }
}
