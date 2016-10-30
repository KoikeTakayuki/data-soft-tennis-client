import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MatchCard from './MatchCard';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class MatchList extends React.Component {

  render() {
    return (
        <Grid>
          <h3>試合一覧</h3>
          <Row>{this.props.matches.map((m) => <Col xs={12} sm={12} md={6}><MatchCard match={m} /></Col>)}</Row>
        </Grid>
    );
  }
}
