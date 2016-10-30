import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class TeamCard extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.team.name}
          subtitle={this.props.team.prefecture_name}
          avatar="assets/images/player.png"
        />
        <CardActions>
          <Link to={"team/" + this.props.team.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}