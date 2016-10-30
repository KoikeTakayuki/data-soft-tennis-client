import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import MatchCard from './MatchCard';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class MatchList extends DataList {


  constructor(props) {
    const url = Server.API.getMatches();
    super(props, url);
  }

  render() {
    if (this.state.data) {
      return (
          <Grid>
            <h2>試合一覧</h2>
            <Row>{this.state.data.map((m) => <Col xs={12} sm={12} md={6}><MatchCard match={m} /></Col>)}</Row>
          </Grid>
      );
    }

    return (
      <Grid>
        <h2>試合一覧</h2>
        <CircularProgressCenter />
      </Grid>
    );
  }
}
