import {Component} from 'react';

export interface IModuleRoute {
    path: string;
    component: any;
}

export abstract class ModuleComponent<T, S> extends Component<{value: T, onChange: (value: T) => any}, S> {
    static TITLE: string;
}
