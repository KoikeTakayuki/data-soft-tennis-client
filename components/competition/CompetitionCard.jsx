import React from 'react';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class CompetitionCard extends React.Component {

  render() {
    return (
      <Card>
        <CardTitle title={this.props.competition.name} subtitle={this.props.competition.tennis_court_name} />
        <CardActions>
          <Link to={"competition/" + this.props.competition.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}