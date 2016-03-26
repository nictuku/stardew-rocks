import React from 'react';
import ReactCSS from 'reactcss';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import TextField from 'material-ui/lib/text-field';

class SearchBar extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  render () {
    return (
      <Toolbar>
        <ToolbarGroup>
          <TextField hintText="Search for farms or farmers" />
        </ToolbarGroup>
      </Toolbar>
    );
  };
}

export default SearchBar;
