import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import * as drawerActions from "../actions/drawerActions";
import Navbar from './Navbar';
import Drawer from './Drawer';
import theme from '../theme';

@Radium
class App extends React.Component {
  getChildContext () {
    return {
      muiTheme: getMuiTheme(theme)
    };
  }

  static propTypes = {
    children: PropTypes.object.isRequired,
    drawer: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      isDocked: PropTypes.bool.isRequired,
      mql: PropTypes.object.isRequired
    }).isRequired,
    dockDrawer: PropTypes.func.isRequired,
    undockDrawer: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    updateAutoDock: PropTypes.func.isRequired
  };

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  componentWillMount () {
    this.props.drawer.mql.addListener(this.props.updateAutoDock);
  }

  componentWillUnmount () {
    this.props.drawer.mql.removeListener(this.props.updateAutoDock);
  }

  styles () {
    return {
      app: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      },
      main: {
        flex: "1",
        display: "flex",
        flexDirection: "column"
      },
      leftNavOverlay: {
        position: 'relative'
      }
    };
  }

  render () {
    return (
      <div style={this.styles().app}>
        <header>
          <Navbar
            isMobile={!this.props.drawer.mql.matches}
            toggleDrawer={this.props.toggleDrawer}
            drawerIsDocked={this.props.drawer.isDocked}
          />
        </header>
        <Drawer
          isMobile={!this.props.drawer.mql.matches}
          isOpen={this.props.drawer.isOpen}
          isDocked={this.props.drawer.isDocked}
          toggleDrawer={this.props.toggleDrawer}
          dockDrawer={this.props.dockDrawer}
          undockDrawer={this.props.undockDrawer}
        >

          <main style={this.styles().main}>
              {this.props.children}
          </main>
        <footer></footer>
        </Drawer>
      </div>
    );
  }
}

export default connect(
  state => ({
    drawer: state.drawer
  }),
  dispatch => ({
    toggleDrawer: () => {
      dispatch(drawerActions.toggleDrawer());
    },
    dockDrawer: () => {
      dispatch(drawerActions.dockDrawer());
    },
    undockDrawer: () => {
      dispatch(drawerActions.undockDrawer());
    },
    updateAutoDock: () => {
      dispatch(drawerActions.updateAutoDock());
    }
  })
)(App);
