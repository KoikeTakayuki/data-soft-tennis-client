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
    this.state = {
      teamDivisionId: false,
      teamDivisions: [],
      prefectureId: false,
      prefectures: []
    };
    this.onTeamDivisionChange = this.onTeamDivisionChange.bind(this);
    this.onPrefectureChange = this.onPrefectureChange.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
  }

  componentDidMount() {
    Server.Proxy.getTeamDivisions().then(teamDivisions => {
      this.setState({ teamDivisions: teamDivisions });
    });
    Server.Proxy.getPrefectures().then(prefectures => {
      this.setState({ prefectures: prefectures });
    });
  }

  fetchTeams(condition) {

    this.previousRequestPromise = Server.Proxy.getTeams(condition).then(teams => {
      this.setState({teams: teams});
    });
  }

  onTeamDivisionChange(e, i, teamDivisionId) {
    this.setState({ teamDivisionId: teamDivisionId });

    this.fetchTeams({
      team_division_id: teamDivisionId,
      prefecture_id: this.state.prefectureId
    });
  }

  onPrefectureChange(e, i, prefectureId) {
    this.setState({ prefectureId: prefectureId });
    this.fetchTeams({
      team_division_id: this.state.teamDivisionId,
      prefecture_id: prefectureId
    });
  }

  render() {

    return (
      <div>
        <Grid>
          <h1>チームを探す</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu maxHeight={300} value={this.state.prefectureId} onChange={this.onPrefectureChange} style={{width: 140}} autoWidth={true} labelStyle={{fontSize: "16px"}}>
              {this.state.prefectures.map((p) => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
            </DropDownMenu>
            <br/ >
            <DropDownMenu value={this.state.teamDivisionId} onChange={this.onTeamDivisionChange} style={{width: 240}} autoWidth={true} labelStyle={{fontSize: "16px"}}>
              {this.state.teamDivisions.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
            </DropDownMenu>
          </div>
          {this.state.teams ? (
              <TeamList teams={this.state.teams} />
            ) : null
          }
        </Grid>
      </div>
    );

  }
}
