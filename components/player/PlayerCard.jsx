import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class PlayerCard extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.player.name}
          subtitle={this.props.player.team_name}
          avatar="assets/images/player.png"
          style={{height: 70}}
        />
        <CardActions>
          <Link to={"player/" + this.props.player.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}