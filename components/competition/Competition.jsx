import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionCard from './CompetitionCard';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';

export default class Competition extends React.Component {


  constructor(props) {
    super(props);
    const competitionId = props.params.competitionId;
  }

  render() {

    return (
      <Grid>
        <h2>大会詳細</h2>
        <Row><Col md={12} style={{"text-align": "center", "margin-top": "30px"}}><CircularProgress mode="indeterminate" size={60} /></Col></Row>
      </Grid>
    );
  }
}
