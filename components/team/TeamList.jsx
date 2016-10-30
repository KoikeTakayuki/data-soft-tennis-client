import React from 'react';
import TeamCard from './TeamCard';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router'

export default class TeamList extends React.Component {

  render() {
    return (
      <Grid>
        <h3>チーム一覧</h3>
        <Row>{this.props.teams.map((t) => <Col xs={12} sm={6} md={6} lg={3}><TeamCard team={t} /></Col>)}</Row>
      </Grid>
    );
  }
}
