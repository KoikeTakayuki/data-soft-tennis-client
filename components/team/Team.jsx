import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TeamPlayerList from './TeamPlayerList';
import FormerTeamPlayerList from './FormerTeamPlayerList';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class Team extends React.Component {


  constructor(props) {
    super(props);
    this.state = { team: false };
  }

  componentDidMount() {
    Server.Proxy.getTeamById(this.props.params.teamId).then(team => {
      this.setState({ team: team });
    });
  }

  render() {
    if (this.state.team) {

      const team = this.state.team;

      return (
        <Grid>
          <h1>{team.name}</h1>
          <div style={{ marginLeft: 10 }}>{team.prefecture.name}/{team.team_division.name}</div>
          <TeamPlayerList team={team} />
          <FormerTeamPlayerList team={team} />
        </Grid>
      );
    }

    return null;
  }
}
