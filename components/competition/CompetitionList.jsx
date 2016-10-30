import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionCard from './CompetitionCard';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class CompetitionList extends DataList {


  constructor(props) {
    const url = Server.API.getCompetitions();
    super(props, url);
  }

  render() {
    if (this.state.data) {
      return (
          <Grid>
            <h2>大会一覧</h2>
            <Row>{this.state.data.map((c) => <Col xs={12} sm={12} md={12}><CompetitionCard competition={c} /></Col>)}</Row>
          </Grid>
      );
    }

    return (
      <Grid>
        <h2>大会一覧</h2>
        <CircularProgressCenter />
      </Grid>
    );
  }
}
