import * as React from 'react';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import {createStore, combineReducers, Action, Store} from 'redux'
import {Provider, connect} from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

import {WithRouter, IRouterContext} from './utils/WithRouter';
import * as mc from './modules/core';

import TopLevelForm from './TopLevelForm';

const SelectableList = MakeSelectable(List);

const history = useRouterHistory(createHashHistory)({
    basename: '/',
    queryKey: false
});

//import {reducer} from './modules/dashboard';
interface ITab {
    modname: string;
    modpath?: string;
    data?: any;
}
interface ITabs {
    data: ITab[];
}
function tabs(state: ITabs = { data: [] }, act: any) {
    switch (act.type) {
        case 'addtab':
            let mp = String(state.data.length);
            act.router.push('documents/' + mp);
            return {
                data: state.data.concat([{ modname: 'documents', modpath: mp }]),
            };
    }
    return state;
}

const store = createStore(combineReducers({
    tabs
}));

export const Application = (props: { modules: mc.IModuleRoute[] }) => {
    MainFormImpl.MODULES = props.modules; //reactjs angels cry once again
    return <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/*' component={MainForm}>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>
};

type ReduxProps<T> = Store<T> & T;
@WithRouter
class MainFormImpl extends React.Component<ReduxProps<ITabs>, {}> {
    static MODULES: mc.IModuleRoute[];
    context: IRouterContext;

    handleChangeModule(e: any, value: any) {
        if (value === 'documents') {
            this.props.dispatch({ type: 'addtab', router: this.context.router });
            return;
        }
        this.context.router.push(value);
    }

    handleChangeTab(value: any) {
        this.context.router.push(value);
    }

    render() {
        const aprops = this.props as any;
        let child = MainFormImpl.MODULES.filter(e => e.path === aprops.params.splat.split('/')[0]).map(e => e.component)[0];
        return <TopLevelForm
        title={<Tabs
                    style={{ overflowX: 'auto' }}
                    tabItemContainerStyle={{ width: (this.props.data.length * 8) + 'em' }}
                    value={aprops.params.splat}
                    onChange={this.handleChangeTab.bind(this) }
                    >
                    {this.props.data.map((t, i) => <Tab
                        key={i}
                        value={t.modpath ? (t.modname + '/' + t.modpath) : t.modname}
                        label={i}
                        style={{ overflow: 'hidden' }}
                        />) }
                </Tabs>}
        drawerMenu={<SelectableList
                    value={aprops.location.pathname}
                    onChange={this.handleChangeModule.bind(this) }
                    >
                    { MainFormImpl.MODULES.map(m => <ListItem key={m.path} value={m.path} primaryText={m.component.TITLE} style={{ textTransform: 'capitalize' }}/>) }
                </SelectableList>}
        >
            {React.createElement(child, {})}
        </TopLevelForm>;
    }
}
const MainForm = connect((state: any) => state.tabs)(MainFormImpl);
