import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import {cloneProps} from './utils';

interface TopLevelProps {
    title?: string | React.ReactElement<any>
    drawerMenu?: React.ReactElement<any>
}
class TopLevelFormImpl<P> extends React.Component<P & TopLevelProps & {
    width?: number
}, {
    drawerVisible: boolean
}> {
    state = {
        drawerVisible: true
    }

    private setDrawerVisible(visible: boolean) {
        let ns = cloneProps(this.state);
        ns.drawerVisible = visible;
        this.setState(ns);
    }

    private getStyles() {
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
        const self = this;
        const docked = this.props.width === LARGE;
        const styles = this.getStyles();
        if (docked && this.props.drawerMenu)
            styles.root.marginLeft = 256;
        return <div style={styles.root}>
            {this.props.drawerMenu ?
            <Drawer
                open={docked || this.state.drawerVisible}
                onRequestChange={ open => self.setDrawerVisible(open) }
                docked={docked}
                >
                <AppBar showMenuIconButton={false} title='Balance'/>
                {this.props.drawerMenu}
            </Drawer> : null}
            <AppBar
                title={this.props.title}
                showMenuIconButton={!docked}
                onLeftIconButtonTouchTap={ unused => this.setDrawerVisible(!this.state.drawerVisible) }
                >
            </AppBar>
            <div style={styles.content}>
                {this.props.children}
            </div>
        </div>;
    }
}
export default class TopLevelForm<P> extends withWidth<P & TopLevelProps>()(TopLevelFormImpl) {}
