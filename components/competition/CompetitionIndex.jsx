import React from 'react';
import CompetitionList from './CompetitionList';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import { Grid, Row, Col } from 'react-bootstrap';

export default class CompetitionIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { competitions: false };
  }

  componentDidMount() {
    this.fetchCompetitions(Server.API.getCompetitions());
  }

  fetchCompetitions(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (competitions) => {
        this.setState({ competitions: competitions });
      }
    });
  }

  render() {

    return (
      <Grid>
        <h1>大会一覧</h1>
        {this.state.competitions ? (
            <CompetitionList competitions={this.state.competitions} />
          ) : (
            <CircularProgressCenter />
          )
        }
      </Grid>
    );

  }
}