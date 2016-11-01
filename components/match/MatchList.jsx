import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MatchCard from './MatchCard';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter';
import ResponsiveBanner from '../adsense/ResponsiveBanner';

export default class MatchList extends React.Component {

  render() {
    return (
          <Row>{this.props.matches.map((m) => <Col key={m.id} xs={12} sm={12} md={6}><MatchCard match={m} /></Col>)}</Row>
    );
  }
}
