import React from 'react';
import ReactCSS from 'reactcss';
import Sidebar from 'react-sidebar';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import IconButton from 'material-ui/lib/icon-button';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

class Drawer extends ReactCSS.Component {
  constructor (props, context) {
    super(props, context);
  }

  classes () {
    return {
      default: {
        link: {
          textDecoration: 'none'
        },
        toolbar:  {
          backgroundColor: this.context.muiTheme.palette.accent1Color
        },
        iconButton: {
          margin: 'auto'
        },
        drawer: {
          backgroundColor: '#ffffff'
        }
      }
    };
  }

  render () {
    return (
      <Sidebar styles={{sidebar: this.styles().drawer}}
        sidebar={
          <div>
            <Toolbar style={this.styles().toolbar}>
              <ToolbarTitle text={this.props.isDocked ? 'Undock Drawer' : 'Dock Drawer'} />
              <IconButton iconClassName="material-icons" style={this.styles().iconButton}
                onClick={this.props.isDocked ? this.props.undockDrawer : this.props.dockDrawer}
              >
                {this.props.isDocked ? 'fullscreen_exit' : 'fullscreen'}
              </IconButton>
            </Toolbar>
            <Menu>
              <a href="https://github.com/nictuku/stardew-rocks" style={this.styles().link}>
                <MenuItem primaryText="Download Client"
                  leftIcon={<FontIcon className="material-icons">file_download</FontIcon>}
                />
              </a>
              <MenuItem primaryText="Donate"
                leftIcon={<FontIcon className="fa fa-paypal" />}
              />
              <MenuItem primaryText="Discord"
                leftIcon={
                  <object type="image/svg+xml" data="content/discord.svg" />
                }
              />
            </Menu>
          </div>
        }
        open={this.props.isOpen}
        docked={this.props.isDocked}
        onSetOpen={this.props.toggleDrawer}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

Drawer.contextTypes = {
  muiTheme: React.PropTypes.object
};

Drawer.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  isDocked: React.PropTypes.bool.isRequired,
  toggleDrawer: React.PropTypes.func.isRequired,
  dockDrawer: React.PropTypes.func,
  undockDrawer: React.PropTypes.func,
  children: React.PropTypes.array
};

export default Drawer;
