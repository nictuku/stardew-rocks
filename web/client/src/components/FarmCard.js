import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {Link} from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

@Radium
class FarmCard extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired
  };

  styles () {
    return {
      link: {
        overflow: 'hidden'
      },
      card: {
        display: 'inline-block',
        margin: '.5rem',
        maxWidth: '100%',
        height: '284px',
        zIndex: 'initial'
      },
      cell: {
        height: '284px',
        width: '350px'
      }
    };
  }

  render () {
    const thumb = _.split(this.props.farm.Thumbnail, '.');
    /* eslint-disable no-magic-numbers */
    return (
      <Card
        style={this.styles().card}
        className="farm-card"
      >
        <Link to={`/${this.props.farm.ID}`} key={this.props.farm.ID} style={this.styles().link}>
          <CardMedia style={this.styles().cell}
            overlay={<CardTitle title={this.props.farm.Name} subtitle={`by ${this.props.farm.Farmer}`} />}
          >
            <img src={`${thumb[0]}w350.${thumb[1]}`} />
          </CardMedia>
        </Link>
      </Card>
    );
  }
}

export default FarmCard;
