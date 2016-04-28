import React, {PropTypes} from 'react';
import Radium from 'radium';

import Card from './Card';
import StatsEarningsChart from './StatsEarningsChart';

@Radium
class Stats extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired
  };

  styles () {
    return {
      statsCard: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
      }
    };
  }

  render () {
    return (
      <div>
        <Card isMobile={this.props.isMobile}>
          <h4>Stats</h4>
          <div style={{height: '300px'}}>
            <StatsEarningsChart farm={this.props.farm} />
          </div>
        </Card>
      </div>
    );
  }
}

export default Stats;
