import React from 'react';
import TeamList from './TeamList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class TeamIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = { teamDivisionId: false, teamDivisions: false };
    this.onTeamDivisionChanged = this.onTeamDivisionChanged.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
  }

  componentDidMount() {
    Server.Proxy.getTeamDivisions().then(teamDivisions => {
      this.setState({ teamDivisions: teamDivisions });
    });
  }

  fetchTeams(condition) {

    this.previousRequestPromise = Server.Proxy.getTeams(condition).then(teams => {
      this.setState({teams: teams});
    });
  }

  onTeamDivisionChange(e, i, teamDivisionId) {

    this.setState({
      teamDivisionId: teamDivisionId
    });

    this.fetchTeams({team_division_id: teamDivisionId});
  }

  onPrefectureChanged(e) {

  }

  render() {

    return (
      <div>
        <Grid>
          <h1>チーム一覧</h1>
          
            {this.state.teamDivisions ? (
              <div style={{textAlign: "right", marginBottom: "10px"}}>
                <DropDownMenu value={this.state.teamDivisionId} onChange={this.onTeamDivisionChange} style={{width: 150}} autoWidth={false} labelStyle={{fontSize: "20px"}}>
                  {this.state.teamDivisions.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
                </DropDownMenu>
              </div>
            ) : (
              null
            )}
          {this.state.teams ? (
              <TeamList teams={this.state.teams} />
            ) : null
          }
        </Grid>
      </div>
    );

  }
}
