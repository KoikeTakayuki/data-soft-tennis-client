import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CompetitionMatchList from './CompetitionMatchList';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class Competition extends React.Component {


  constructor(props) {
    super(props);
    const competitionId = props.params.competitionId;
    this.url = Server.API.getCompetitionById(competitionId);

    this.state = { competition: false };
  }

  componentDidMount() {
    this.fetchCompetition(this.url);
  }

  fetchCompetition(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (competition) => {
        this.setState({ competition: competition });
      }
    });
  }

  render() {
    if (this.state.competition) {
      return (
        <div>
          <Grid>
            <h2>{this.state.competition.name}</h2>
          </Grid>
          <CompetitionMatchList competition={this.state.competition} />
        </div>
      );
    }
  }
}
