import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TennisCourtCard from './TennisCourtCard';
import Server from '../../config/server';

export default class CompetitionList extends React.Component {

  render() {
    return (
          <Row>{this.props.tennisCourts.map((t) => <Col key={t.id} xs={12} sm={12} md={12}><TennisCourtCard tennisCourt={t} /></Col>)}</Row>
    );
  }
}
