import React from 'react';
import PlayerList from './PlayerList';
import { Grid, Row, Col } from 'react-bootstrap';
import Server from '../../config/server';
import CircularProgressCenter from '../util/CircularProgressCenter'
import Pager from 'react-pager';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router'

export default class PlayerIndex extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      players: [],
      prefectureId: props.params.prefectureId ? Number(props.params.prefectureId) : undefined,
      teamDivisionId: props.params.teamDivisionId ? Number(props.params.teamDivisionId) : undefined,
      teamDivisions: [],
      prefectures: [],
      pageNumber: 0,
      maxPageNumber: 1,
      count: 0,
      prefectureName: '全国',
      teamDivisionName: ''
    };

    this.onTeamDivisionChanged = this.onTeamDivisionChanged.bind(this);
    this.onPrefectureChanged = this.onPrefectureChanged.bind(this);
    this.onParameterChanged = this.onParameterChanged.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
    this.fetchPlayers = this.fetchPlayers.bind(this);
    this.setPrefecture = this.setPrefecture.bind(this);
    this.setTeamDivision = this.setTeamDivision.bind(this);
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

    if (teamDivision && teamDivision.name) {

      if (teamDivision.name === "中学校") {
        this.setState({ teamDivisionName: '中学生'});
      } else if (teamDivision.name === "高校" || teamDivision.name === "大学") {
        this.setState({ teamDivisionName: teamDivision.name + '生'});
      } else {
        this.setState({ teamDivisionName: teamDivision.name});
      }

    } else {
      this.setState({ teamDivisionName: ''});
    }
  }


  fetchPlayers(prefectureId, teamDivisionId, pageNumber, updateRecordCount) {

    Server.Proxy.getPlayers({
      "current_team.prefecture_id": prefectureId,
      "current_team.team_division_id": teamDivisionId,
      pageNumber: pageNumber
    }).then(players => {
      this.setState({ players: players });
    });

    if (updateRecordCount) {
      Server.Proxy.getPlayerCount({
        "current_team.prefecture_id": prefectureId,
        "current_team.team_division_id": teamDivisionId
      }).then(count => {

        this.setState({
          count: count,
          maxPageNumber: (count / 12)
        });
      });

      this.setPrefecture(prefectureId);
      this.setTeamDivision(teamDivisionId);
    }
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

      this.fetchPlayers(this.state.prefectureId, this.state.teamDivisionId, this.state.pageNumber, true);
    });
  }

  onTeamDivisionChanged(e, i, teamDivisionId) {
    this.onParameterChanged(this.state.prefectureId, teamDivisionId);
  }

  onPrefectureChanged(e, i, prefectureId) {
    this.onParameterChanged(prefectureId, this.state.teamDivisionId);
  }

  onParameterChanged(prefectureId, teamDivisionId) {
    browserHistory.push("/player" + (prefectureId ? "/prefecture-" + prefectureId : "") + (teamDivisionId ? "/team-division-" + teamDivisionId : ""));
    this.setState({
      prefectureId: prefectureId,
      teamDivisionId: teamDivisionId,
      pageNumber: 0
    });

    this.fetchPlayers(prefectureId, teamDivisionId, 0, true);
  }

  onPageChanged(pageNumber) {
    pageNumber = Math.ceil(pageNumber);
    this.setState({ pageNumber: pageNumber});
    this.fetchPlayers(this.state.prefectureId, this.state.teamDivisionId, pageNumber, false);
  }

  render() {

    let count = this.state.count,
        start = this.state.pageNumber * 12 + 1,
        end = Math.min(count, start + 11),
        countStyle={ fontSize: 16, fontWeight: 700};

    return (
      <Grid>
        <h1>{this.state.prefectureName}の{this.state.teamDivisionName}プレイヤーを探す</h1>
          <div style={{textAlign: "right", marginBottom: "10px"}}>
            <DropDownMenu maxHeight={300} value={this.state.prefectureId} onChange={this.onPrefectureChanged} style={{margin: -20}} labelStyle={{fontSize: "14px"}}>
              <MenuItem value={undefined}  primaryText="都道府県" />{this.state.prefectures.map((p) => <MenuItem key={p.id} value={p.id} primaryText={p.name} />)}
            </DropDownMenu>
            <DropDownMenu value={this.state.teamDivisionId} onChange={this.onTeamDivisionChanged} labelStyle={{fontSize: "14px"}}>
              <MenuItem value={undefined}  primaryText="チーム区分" />{this.state.teamDivisions.map((t) => <MenuItem key={t.id} value={t.id} primaryText={t.name}/>)}
            </DropDownMenu>
          </div>
        {(this.state.players && this.state.players.length > 0)? (
          <div>
            <div style={{ margin: 12 }}>
              <span style={countStyle}>{count}</span>件中 <span style={countStyle}>{start}</span>件 ~ <span style={countStyle}>{end}</span>件 を表示
            </div>
            <PlayerList players={this.state.players} />
              {(this.state.maxPageNumber > 1) ? (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Pager
                    total={this.state.maxPageNumber}
                    current={this.state.pageNumber}
                    visiblePages={5}
                    titles={{ first: '<<|', last: '|>>︎' }}
                    onPageChanged={this.onPageChanged} />
                </div>
                ) : null}
          </div>
        ) : null}
      </Grid>
    );

  }
}