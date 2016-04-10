import React, {PropTypes} from 'react';
import Radium, {Style} from 'radium';
import _ from 'lodash';
import moment from 'moment';
import 'moment-duration-format';
import numeral from 'numeral';

class FarmMeta extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className="farm-meta">
        <Style
          scopeSelector=".farm-meta"
          rules={{
            textAlign: 'center',
            paddingTop:'.5rem',
            paddingBottom: '.5rem',
            '> div': {
              display: 'inline-block',
              textAlign: 'left',
              padding: '.5rem 1rem .5rem 1rem',
              verticalAlign: 'middle'
            },
            '.title': {
              fontSize: '2rem'
            },
            '.item-label': {
              fontSize: '1.2rem'
            }
          }}
        />
        <div>
          <div className="title">{this.props.farm.Farmer}'s {this.props.farm.Name}</div>
          <div>
            {this.props.farm.Player.DateStringForSaveGame}
          </div>
        </div>
        <div>
          <div>
            <span className="item-label">Wealth: </span>
            {numeral(this.props.farm.Player.Money).format('0,0')}G
          </div>
          <div>
            <span className="item-label">Total Earnings: </span>
            {numeral(this.props.farm.Player.TotalMoneyEarned).format('0,0')}G
          </div>
        </div>
        <div>
          <div>
            <span className="item-label">Last Save: </span>
            {moment.unix(_.takeRight(this.props.farm.History)).fromNow()}
          </div>
          <div>
            <span className="item-label">Time Played: </span>
            {moment.duration(this.props.farm.Player.MillisecondsPlayed).format('H [hrs] m [mins]')}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(FarmMeta);
