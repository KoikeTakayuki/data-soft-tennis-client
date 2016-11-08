import React from 'react';
import TeamList from './TeamList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router'
import Pager from 'react-pager';

export default class TeamIndex extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      prefectureId: props.params.prefectureId ? Number(props.params.prefectureId) : undefined,
      teamDivisionId: props.params.teamDivisionId ? Number(props.params.teamDivisionId) : undefined,
      teamDivisions: [],
      prefectures: [],
      pageNumber: 0,
      maxPageNumber: 1,
      prefectureName: '全国',
      teamDivisionName: 'チーム'
    };

    this.onTeamDivisionChanged = this.onTeamDivisionChanged.bind(this);
    this.onPrefectureChanged = this.onPrefectureChanged.bind(this);
    this.onParameterChanged = this.onParameterChanged.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
    this.setPrefecture = this.setPrefecture.bind(this);
  }

  componentDidMount() {

    Promise.all([
      Server.Proxy.getTeamDivisions().then(teamDivisions => {
        this.setState({ teamDivisions: teamDivisions });
      }),
      Server.Proxy.getPrefectures().then(prefectures => {
        this.setState({ prefectures: prefectures });
      })
    ]).then(() => {

      this.fetchTeams(this.state.prefectureId, this.state.teamDivisionId, this.state.pageNumber, true);
    });

  }

  setPrefecture(prefectureId) {
    let prefecture = this.state.prefectures.find(p => {
      return p.id === Number(prefectureId);
    });

    this.setState({ prefectureName: (prefecture ? prefecture.name : '全国')});
  }

  setTeamDivision(teamDivisionId) {
    let teamDivision = this.state.teamDivisions.find(t => {
      return t.id === Number(teamDivisionId);
    });

    this.setState({ teamDivisionName: (teamDivision ? teamDivision.name : 'チーム')});
  }


  fetchTeams(prefectureId, teamDivisionId, pageNumber, updateRecordCount) {

    Server.Proxy.getTeams({
      prefecture_id: prefectureId,
      team_division_id: teamDivisionId,
      pageNumber: pageNumber
    }).then(teams => {
      this.setState({ teams: teams });
    });

    if (updateRecordCount) {
      Server.Proxy.getTeamCount({
        prefecture_id: prefectureId,
        team_division_id: teamDivisionId
      }).then(count => {
        this.setState({ maxPageNumber: (count / 12) });
      });
    }

    this.setPrefecture(prefectureId);
    this.setTeamDivision(teamDivisionId);
  }

  onTeamDivisionChanged(e, i, teamDivisionId) {
    this.onParameterChanged(this.state.prefectureId, teamDivisionId);
  }

  onPrefectureChanged(e, i, prefectureId) {
    this.onParameterChanged(prefectureId, this.state.teamDivisionId);
  }

  onParameterChanged(prefectureId, teamDivisionId) {
    browserHistory.push("/team" + (prefectureId ? "/prefecture-" + prefectureId : "") + (teamDivisionId ? "/team-division-" + teamDivisionId : ""));
    this.setState({
      prefectureId: prefectureId,
      teamDivisionId: teamDivisionId,
      pageNumber: 0
    });

    this.fetchTeams(prefectureId, teamDivisionId, 0, true);
  }

  onPageChanged(pageNumber) {
    this.setState({ pageNumber: pageNumber});
    this.fetchTeams(this.state.prefectureId, this.state.teamDivisionId, pageNumber, false);
  }

  render() {

    return (
      <div>
        <Grid>
          <h1>{this.state.prefectureName}の{this.state.teamDivisionName}を探す</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu maxHeight={300} value={this.state.prefectureId} onChange={this.onPrefectureChanged} labelStyle={{fontSize: "16px"}}>
              <MenuItem value={undefined}  primaryText="都道府県" />{this.state.prefectures.map((p) => <MenuItem key={p.id} value={p.id} primaryText={p.name} />)}
            </DropDownMenu>
            <br/ >
            <DropDownMenu value={this.state.teamDivisionId} onChange={this.onTeamDivisionChanged} labelStyle={{fontSize: "16px"}}>
              <MenuItem value={undefined}  primaryText="チーム区分" />{this.state.teamDivisions.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
            </DropDownMenu>
          </div>
          {this.state.teams ? (
            <div style={{ textAlign: "center" }}>
              <TeamList teams={this.state.teams} />
              {(this.state.maxPageNumber > 1) ? (
                <Pager
                  total={this.state.maxPageNumber}
                  current={this.state.pageNumber}
                  visiblePages={8}
                  titles={{ first: '<<', last: '>>' }}
                  onPageChanged={this.onPageChanged}
                />
              ) : null}
            </div>
            ) : null
          }
        </Grid>
      </div>
    );

  }
}
