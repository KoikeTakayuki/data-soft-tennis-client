import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'


export default class TennisCourtCard extends React.Component {

  render() {

    const tennisCourt = this.props.tennisCourt;

    return (
      <Card>
        <CardTitle title={tennisCourt.name} subtitle={tennisCourt.prefecture.name + tennisCourt.address} />
        <CardActions>
          <Link to={"tennis-court/" + tennisCourt.id}>
            <FlatButton label="詳細を見る" />
          </Link>
        </CardActions>
      </Card>
    );
  }
}