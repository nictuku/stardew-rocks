import React from 'react';
import Radium from 'radium';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import IconButton from 'material-ui/lib/icon-button';

// Radium stuff
var Link = require('react-router').Link;
Link = Radium(Link);

@Radium
class Navbar extends React.Component {
  static propTypes = {
    toggleDrawer: React.PropTypes.func,
    drawerIsDocked: React.PropTypes.bool.isRequired
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object
  };

  styles () {
    return {
      toolbar: {
        backgroundColor: this.context.muiTheme.rawTheme.palette.primary1Color,
        color: this.context.muiTheme.rawTheme.palette.alternateTextColor,
        display: 'flex'
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
        display: 'flex',
        textDecoration: "none",
        color: this.context.muiTheme.rawTheme.palette.alternateTextColor
      },
      brandDrawerIsDocked: {
        marginLeft: '1rem'
      },
      title: {
        display: 'inline-block'
      },
      color: {
        color: this.context.muiTheme.rawTheme.palette.alternateTextColor
      },
      flex: {
        display: 'flex'
      },
      iconButton: {
        margin: 'auto'
      },
      icon: {
        color: this.context.muiTheme.rawTheme.palette.alternateTextColor
      },
      firstGroup: {
        display: 'flex'
      }
    };
  }

  render () {
    return (
      <Toolbar style={this.styles().toolbar}>
        <ToolbarGroup firstChild style={this.styles().firstGroup}>
          {!this.props.drawerIsDocked ?
            <IconButton
              onClick={this.props.toggleDrawer}
              style={this.styles().iconButton}
              iconClassName="material-icons" iconStyle={this.styles().icon}>menu</IconButton>
          : null}
          <Link to="/"
            style={[
              this.styles().brand,
              this.props.drawerIsDocked ? this.styles().brandDrawerIsDocked : null
            ]}
          >
            <object style={this.styles().logo} type="image/svg+xml" data="content/logo.svg" />
            <ToolbarTitle style={this.styles().title} text="Stardew.Farm" />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Navbar;
