import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionCard from './CompetitionCard';
import Server from '../../config/server';

export default class CompetitionList extends React.Component {

  render() {
    return (
          <Row>{this.props.competitions.map((c) => <Col key={c.id} xs={12} sm={12} md={12}><CompetitionCard competition={c} /></Col>)}</Row>
    );
  }
}
