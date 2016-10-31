import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';

export default class PlayerList extends React.Component {

  render() {
    return (
        <Grid>
          <h3>{this.props.title ? this.props.title : 'プレイヤー一覧'}</h3>
          <Row>{this.props.players.map((p) => <Col xs={12} sm={6} md={3}><PlayerCard player={p} /></Col>)}</Row>
        </Grid>
    );
  }
}
