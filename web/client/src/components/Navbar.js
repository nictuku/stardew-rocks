import React from 'react';
import ReactCSS from 'reactcss';
import {Link} from 'react-router';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

class Navbar extends ReactCSS.Component {
  constructor (props) {
    super(props);
  }

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
        brand: {
          whiteSpace: 'nowrap',
          cursor: "pointer",
          textDecoration: "none",
          color: this.context.muiTheme.palette.alternateTextColor
        },
        title: {
          display: 'inline-block'
        },
        color: {
          color: this.context.muiTheme.palette.alternateTextColor
        },
        flex: {
          display: 'flex'
        },
        iconButton: {
          margin: 'auto'
        },
        icon: {
          color: this.context.muiTheme.palette.alternateTextColor
        }
      },
      drawerIsDocked: {
        brand: {
          marginLeft: '1rem'
        }
      }
    };
  }

  render () {
    return (
      <Toolbar style={this.styles().toolbar}>
        <ToolbarGroup firstChild>
          {!this.props.drawerIsDocked ?
            <IconButton
              onClick={this.props.toggleDrawer}
              style={this.styles().iconButton}
              iconClassName="material-icons" iconStyle={this.styles().icon}>menu</IconButton>
          : null}
          <Link to="/" style={this.styles().brand}>
            <object style={this.styles().logo} type="image/svg+xml" data="content/logo.svg" />
            <ToolbarTitle style={this.styles().title} text="Stardew.Farm" />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

Navbar.contextTypes = {
  muiTheme: React.PropTypes.object
};

Navbar.propTypes = {
  toggleDrawer: React.PropTypes.func,
  drawerIsDocked: React.PropTypes.bool.isRequired
};

export default Navbar;
