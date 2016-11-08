import React from 'react';
import TeamList from './TeamList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router'

export default class TeamIndex extends React.Component {


  constructor(props) {
    super(props);
    console.log(props.params)
    this.state = {
      teamDivisions: [],
      prefectures: [],
      pageNumber: 1
    };

    this.onTeamDivisionChange = this.onTeamDivisionChange.bind(this);
    this.onPrefectureChange = this.onPrefectureChange.bind(this);
    this.onParameterChange = this.onParameterChange.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
  }

  componentDidMount() {
    this.fetchTeams({
      prefecture_id: this.props.params.prefectureId,
      team_division_id: this.props.params.teamDivisionId,
      pageNumber: this.state.pageNumber
    });

    Server.Proxy.getTeamDivisions().then(teamDivisions => {
      this.setState({ teamDivisions: teamDivisions });
    });
    Server.Proxy.getPrefectures().then(prefectures => {
      this.setState({ prefectures: prefectures });
    });
  }

  fetchTeams(condition) {
    Server.Proxy.getTeams(condition).then(teams => {
      this.setState({teams: teams});
    });
  }

  onTeamDivisionChange(e, i, teamDivisionId) {
    this.onParameterChange(this.props.params.prefectureId, teamDivisionId);
  }

  onPrefectureChange(e, i, prefectureId) {
    this.onParameterChange(prefectureId, this.props.params.teamDivisionId);
  }

  onParameterChange(prefectureId, teamDivisionId) {
    browserHistory.push("/team" + (prefectureId ? "/prefecture-" + prefectureId : "") + (teamDivisionId ? "/team-division-" + teamDivisionId : ""));
  }

  render() {

    return (
      <div>
        <Grid>
          <h1>チームを探す</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu maxHeight={300} value={this.props.params.prefectureId} onChange={this.onPrefectureChange} style={{width: 140}} autoWidth={true} labelStyle={{fontSize: "16px"}}>
              <MenuItem value={undefined}  primaryText="都道府県" />{this.state.prefectures.map((p) => <MenuItem key={p.id} value={p.id} primaryText={p.name} />)}
            </DropDownMenu>
            <br/ >
            <DropDownMenu value={this.props.params.teamDivisionId} onChange={this.onTeamDivisionChange} style={{width: 240}} autoWidth={true} labelStyle={{fontSize: "16px"}}>
              <MenuItem value={undefined}  primaryText="チーム区分" />{this.state.teamDivisions.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
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
