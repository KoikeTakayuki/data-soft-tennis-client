import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionCard from './CompetitionCard';
import Server from '../../config/server';

export default class CompetitionList extends React.Component {

  render() {
    return (
        <Grid>
          <h2>大会一覧</h2>
          <Row>{this.props.competitions.map((c) => <Col xs={12} sm={12} md={12}><CompetitionCard competition={c} /></Col>)}</Row>
        </Grid>
    );
  }
}
