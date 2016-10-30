import React from 'react';
import DataList from '../DataList';
import { Grid, Row, Col } from 'react-bootstrap';
import TeamPlayerList from './TeamPlayerList';
import Server from '../../config/server';
import { CircularProgress } from 'material-ui';
import CircularProgressCenter from '../util/CircularProgressCenter'

export default class Team extends React.Component {


  constructor(props) {
    super(props);
    const teamId = props.params.teamId;
    this.url = Server.API.getTeamById(teamId);

    this.state = { team: false };
  }

  componentDidMount() {
    this.fetchTeam(this.url);
  }

  fetchTeam(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: (team) => {
        this.setState({ team: team });
      }
    });
  }

  render() {
    if (this.state.team) {
      return (
        <div>
          <Grid>
            <h2>{this.state.team.name}</h2>
          </Grid>
          <TeamPlayerList team={this.state.team} />
        </div>
      );
    }

    return <CircularProgressCenter />
  }
}
