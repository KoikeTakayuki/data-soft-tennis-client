import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';

export default class PlayerList extends React.Component {

  render() {
    return (
       <Row>{this.props.players.map((p) => <Col key={p.id} xs={12} sm={6} md={3}><PlayerCard player={p} /></Col>)}</Row>
    );
  }
}
