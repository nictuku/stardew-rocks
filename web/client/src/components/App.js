import React from 'react';
import ReactCSS from 'reactcss';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import Navbar from './Navbar';
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
        }
      }
    }
  }

  render () {
    return (
      <div style={this.styles().app}>
        <header className="navbar-fixed">
          <Navbar />
        </header>
        <main style={this.styles().main}>
          {this.props.children}
        </main>
        <footer></footer>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
