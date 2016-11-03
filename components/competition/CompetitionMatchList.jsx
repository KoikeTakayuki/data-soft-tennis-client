import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MatchList from '../match/MatchList';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class CompetitionMatchList extends React.Component {


  constructor(props) {
    super(props);
    this.state = { matches: false };
  }

  componentDidMount() {
    Server.Proxy.getMatchesByCompetitionId(this.props.competition.id).then(matches => {
      this.setState({ matches: matches });
    });
  }

  render() {
    if (this.state.matches) {
      return (
        <Grid>
          <h2>試合一覧</h2>
          <MatchList matches={this.state.matches} />
        </Grid>
      );
    }

    return <CircularProgressCenter />
  }
}
