import React from 'react';
import ReactCSS from 'reactcss';
import * as _ from 'lodash';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class SearchBar extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  render () {
    return (
      <Toolbar noGutter>
        <ToolbarGroup>
          <FontIcon className="material-icons">search</FontIcon>
          <TextField hintText="Search for farms or farmers" />
        </ToolbarGroup>
      </Toolbar>
    );
  };
};

SearchBar.propTypes = {
  changeFilter: React.PropTypes.func,
  filter: React.PropTypes.number.isRequired,
  filters: React.PropTypes.array.isRequired
};

export default SearchBar;
