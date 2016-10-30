import React from 'react';
import DataList from './DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import ServerConfig from '../config/server-config';
import { CircularProgress } from 'material-ui';

export default class PlayerList extends DataList {


  constructor(props) {
    const url = ServerConfig.URL + 'player';
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
        <CircularProgress mode="indeterminate" size={60} />
      </Grid>
    );
  }
}
