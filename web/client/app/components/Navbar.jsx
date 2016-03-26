import React from 'react';
import ReactCSS from 'reactcss';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import SvgIcon from 'material-ui/lib/svg-icon';
import {Link} from 'react-router';

class Navbar extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  classes () {
    return {
      default: {
        logo: {
          verticalAlign: "text-bottom",
          height: "40px",
          width: "40px",
          pointerEvents: "none",
          cursor: "pointer",
          marginRight: "1rem"
        },
        title: {
          cursor: "pointer",
          textDecoration: "none",
          color: "#FFFFFF"
        }
      }
    };
  };

  render () {
    return (
      <AppBar
        showMenuIconButton={false}
        title={
          <Link to="/" style={this.styles().title}>
            <object style={this.styles().logo} type="image/svg+xml" data="content/logo.svg" />
            StardewRocks
          </Link>
        }
      />
    );
  };
};

export default Navbar;
