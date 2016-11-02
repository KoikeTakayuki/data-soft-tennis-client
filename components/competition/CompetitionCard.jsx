import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class CompetitionCard extends React.Component {

  render() {

    const competition = this.props.competition;
    const date = new Date(competition.date);
    const duration = competition.duration;

    let dateText;
    if (!duration || duration <= 1) {
      dateText = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
    } else {
      const endDate = new Date(competition.date);
      endDate.setDate(endDate.getDate() + duration - 1);
      dateText = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日〜' + (endDate.getMonth() + 1) + '月' + endDate.getDate() + '日';
    }

    return (
      <Card>
        <CardTitle title={competition.name} subtitle={dateText + '  ' + competition.tennis_court_name} />
        <CardActions>
          <Link to={"competition/" + competition.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}