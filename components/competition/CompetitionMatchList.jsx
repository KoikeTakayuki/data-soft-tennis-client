import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MatchCard from '../match/MatchCard';
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
          <h3>試合一覧</h3>
          <Row>{this.state.matches.map((m) => <Col xs={12} sm={12} md={6}><MatchCard match={m} /></Col>)}</Row>
        </Grid>
      );
    }

    return <CircularProgressCenter />
  }
}
