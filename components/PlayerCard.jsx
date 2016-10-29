import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class PlayerCard extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          title="Without Avatar"
          subtitle="Subtitle"
          avatar="assets/images/player.png"
        />
        <CardActions>
          <Link to="player">
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}