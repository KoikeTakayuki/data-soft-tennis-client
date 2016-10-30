import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class PlayerList extends DataList {


  constructor(props) {
    const url = Server.API.getPlayers();
    super(props, url);
  }

  render() {
    if (this.state.data) {
      return (
          <Grid>
            <h2>プレイヤー一覧</h2>
            <Row>{this.state.data.map((p) => <Col xs={12} sm={6} md={3}><PlayerCard player={p} /></Col>)}</Row>
          </Grid>
      );
    }

    return (
      <Grid>
        <h2>プレイヤー一覧</h2>
        <CircularProgressCenter />
      </Grid>
    );
  }
}
