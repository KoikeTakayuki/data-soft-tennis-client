import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';

export default class PlayerList extends React.Component {
  render() {
    const players = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    return (
        <Grid>
          <h2>プレイヤー一覧</h2>
          <Row>
            {players.map((p) => <Col xs={12} sm={6} md={3}><PlayerCard player={p} /></Col>)}
          </Row>
        </Grid>
    );
  }
}