import * as React from 'react';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';

import {WithRouter, IRouterContext} from './utils/WithRouter';
import * as mc from './modules/core';

const SelectableList = MakeSelectable(List);

const history = useRouterHistory(createHashHistory)({
    basename: '/',
    queryKey: false
});

export const Application = (props: { modules: mc.IModuleRoute[] }) => {
    Main.MODULES = props.modules; //reactjs angels cry once again
    return <MuiThemeProvider>
        <Router history={history}>
            <Route path='/' component={MainWithWidth}>
                <IndexRedirect to='dashboard'/>
                { props.modules.map(m => <Route key={m.path} path={m.path} component={m.component}/>) }
            </Route>
        </Router>
    </MuiThemeProvider>
};

interface IAppState {
    drawer: boolean;
}
@WithRouter
class Main extends React.Component<any, IAppState> {
    static MODULES: mc.IModuleRoute[];
    state = {
        drawer: false
    };
    context: IRouterContext;

    handleToggle(e: Event) {
        e.preventDefault();
        this.setState({
            drawer: !this.state.drawer
        });
    }

    handleChangeModule(e: any, value: any) {
        this.context.router.push(value);
    }

    getStyles() {
        const styles = {
            content: {
                margin: spacing.desktopGutter,
            },
            root: {
                marginLeft: 0,
            }
        };
        return styles;
    }

    render() {
        const handleToggle = this.handleToggle.bind(this);
        const docked = this.props.width === LARGE;
        const styles = this.getStyles();
        if (docked)
            styles.root.marginLeft = 256;
        return <div style={styles.root}>
            <Drawer
                open={docked || this.state.drawer}
                onRequestChange={(open) => this.setState({ drawer: open }) }
                docked={docked}
                >
                <AppBar showMenuIconButton={false} title='Balance'/>
                <SelectableList
                    value={this.props.location.pathname}
                    onChange={this.handleChangeModule.bind(this)}
                    >
                    { Main.MODULES.map(m => <ListItem key={m.path} value={m.path} primaryText={m.component.TITLE} style={{ textTransform: 'capitalize' }}/>) }
                </SelectableList>
            </Drawer>
            <AppBar
                title={this.props.children.type.TITLE}
                style={{ textTransform: 'capitalize' }}
                showMenuIconButton={!docked}
                onLeftIconButtonTouchTap={handleToggle}
                />
            <div style={styles.content}>
                {this.props.children}
            </div>
        </div>;
    }
}
let MainWithWidth = withWidth()(Main);
