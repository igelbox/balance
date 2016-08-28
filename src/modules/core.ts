import {Component} from 'react';

export interface IModuleRoute {
    path: string;
    component: any;
}

export abstract class ModuleComponent<P, S> extends Component<P, S> {
    static TITLE: string;
}
