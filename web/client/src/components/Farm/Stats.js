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
        padding: '3rem'
      }
    };
  }

  render () {
    return (
      <div>
        <Card isMobile={this.props.isMobile}>
          <div style={this.styles().statsCard}>
            <h4>Stats</h4>
            <StatsEarningsChart farm={this.props.farm} />
          </div>
        </Card>
      </div>
    );
  }
}

export default Stats;
