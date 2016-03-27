import React from 'react';
import ReactCSS from 'reactcss';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';
import SvgIcon from 'material-ui/lib/svg-icon';
import FontIcon from 'material-ui/lib/font-icon';
import {Link} from 'react-router';

class Navbar extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  classes () {
    return {
      default: {
        toolbar: {
          backgroundColor: this.context.muiTheme.palette.primary1Color,
          color: this.context.muiTheme.palette.alternateTextColor
        },
        logo: {
          height: "40px",
          width: "40px",
          pointerEvents: "none",
          cursor: "pointer",
          margin: ".5rem .5rem .5rem 0"
        },
        title: {
          display: 'inline-block'
        },
        brand: {
          marginLeft: '1rem',
          whiteSpace: 'nowrap',
          cursor: "pointer",
          textDecoration: "none",
          color: this.context.muiTheme.palette.alternateTextColor
        },
        color: {
          color: this.context.muiTheme.palette.alternateTextColor
        },
        flex: {
          display: 'flex'
        }
      }
    };
  };

  render () {
    return (
      <Toolbar style={this.styles().toolbar}>
        <ToolbarGroup firstChild>
        <Link to="/" style={this.styles().brand}>
          <object style={this.styles().logo} type="image/svg+xml" data="content/logo.svg" />
          <ToolbarTitle style={this.styles().title} text="Stardew.Farm" />
        </Link>
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <FlatButton style={this.styles().color}
            linkButton
            href="https://github.com/nictuku/stardew-rocks"
            label="Download Client"
          />
          <form style={this.styles().flex}
            action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
            " />
            <FlatButton style={this.styles().color}
              type="submit"
              label="Donate"
              icon={<FontIcon className="fa fa-paypal" />}
            />
          </form>
        </ToolbarGroup>
      </Toolbar>
    );
  };
};

Navbar.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default Navbar;
