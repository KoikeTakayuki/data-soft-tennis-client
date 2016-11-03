import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class PlayerCard extends React.Component {

  render() {

    const player = this.props.player;
    return (
      <Card>
        <CardHeader
          title={player.name}
          subtitle={player.current_team.name}
          avatar="assets/images/player.png"
          style={{height: 70}}
        />
        <CardActions>
          <Link to={"player/" + player.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}