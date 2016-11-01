import React from 'react';
import TeamCard from './TeamCard';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router'

export default class TeamList extends React.Component {

  render() {
    return (
      <Row>{this.props.teams.map((t) => <Col key={t.id} xs={12} sm={6} md={6} lg={3}><TeamCard team={t} /></Col>)}</Row>
    );
  }
}
