import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MatchList from '../match/MatchList';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class CompetitionMatchList extends React.Component {


  constructor(props) {
    super(props);
    const competition = props.competition;
    this.url = Server.API.getMatchesByCompetitionId(competition.id);
    this.state = { matches: false };
  }

  componentDidMount() {
    this.fetchMatches(this.url);
  }

  fetchMatches(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: true,
      success: (matches) => {
        this.setState({ matches: matches });
      }
    });
  }

  render() {
    if (this.state.matches) {
      return (
        <Grid>
          <MatchList matches={this.state.matches} />
        </Grid>
      );
    }

    return <CircularProgressCenter />
  }
}
