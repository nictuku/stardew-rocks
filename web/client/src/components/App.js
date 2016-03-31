import React from 'react';
import ReactCSS from 'reactcss';
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import * as drawerActions from "../actions/drawerActions";
import Navbar from './Navbar';
import Drawer from './Drawer';
import theme from '../theme';

class App extends ReactCSS.Component {
  constructor (props) {
    super(props);
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme(theme)
    };
  }

  componentWillMount () {
    // this.props.drawer.mql.addListener(this.props.updateAutoDock);
  }

  componentWillUnmount () {
    // this.props.drawer.mql.removeListener(this.props.updateAutoDock);
  }

  classes () {
    return {
      default: {
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
      }
    };
  }

  render () {
    return (
      <div style={this.styles().app}>
        <Drawer
          isOpen={this.props.drawer.isOpen}
          isDocked={this.props.drawer.isDocked}
          toggleDrawer={this.props.toggleDrawer}
          dockDrawer={this.props.dockDrawer}
          undockDrawer={this.props.undockDrawer}
        >
          <header className="navbar-fixed">
            <Navbar
              toggleDrawer={this.props.toggleDrawer}
              drawerIsDocked={this.props.drawer.isDocked}
            />
          </header>
          <main style={this.styles().main}>
              {this.props.children}
          </main>
        <footer></footer>
        </Drawer>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

App.propTypes = {
  children: React.PropTypes.object,
  drawer: React.PropTypes.shape({
    isOpen: React.PropTypes.bool.isRequired,
    isDocked: React.PropTypes.bool.isRequired
  }).isRequired,
  dockDrawer: React.PropTypes.func,
  undockDrawer: React.PropTypes.func,
  toggleDrawer: React.PropTypes.func,
  updateAutoDock: React.PropTypes.func
};

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
