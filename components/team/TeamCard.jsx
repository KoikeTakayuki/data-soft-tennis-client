import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import DomainIcon from 'material-ui/svg-icons/social/domain';


export default class TeamCard extends React.Component {

  render() {
    const team = this.props.team;

    return (
      <Card>
        <CardHeader
          title={team.name}
          subtitle={team.prefecture.name}
          avatar={<DomainIcon />}
          style={{ height: 70 }}
        />
        <CardActions>
          <Link to={"team/" + team.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}