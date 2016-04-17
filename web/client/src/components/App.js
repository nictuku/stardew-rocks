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

  static propTypes = {
    children: PropTypes.object.isRequired,
    season: PropTypes.string.isRequired,
    drawer: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      isDocked: PropTypes.bool.isRequired,
      mql: PropTypes.object.isRequired
    }).isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    updateAutoDock: PropTypes.func.isRequired
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
    season: PropTypes.string
  };

  getChildContext () {
    return {
      muiTheme: getMuiTheme(theme),
      season: this.props.season
    };
  }

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
    const isMobile = !this.props.drawer.mql.matches;
    return (
      <div style={this.styles().app}>
        <header>
          <Navbar
            toggleDrawer={this.props.toggleDrawer}
            drawerIsDocked={this.props.drawer.isDocked}
            drawerIsOpen={this.props.drawer.isOpen}
            isMobile={isMobile}
          />
        </header>
        <Drawer
          isOpen={this.props.drawer.isOpen}
          isDocked={this.props.drawer.isDocked}
          toggleDrawer={this.props.toggleDrawer}
          isMobile={isMobile}
        >
          <main style={this.styles().main}>
            {React.cloneElement(this.props.children, {isMobile})}
          </main>
        <footer></footer>
        </Drawer>
      </div>
    );
  }
}

export default connect(
  state => ({
    drawer: state.drawer,
    season: state.global.season
  }),
  dispatch => ({
    toggleDrawer: () => {
      dispatch(drawerActions.toggleDrawer());
    },
    updateAutoDock: () => {
      dispatch(drawerActions.updateAutoDock());
    }
  })
)(App);
